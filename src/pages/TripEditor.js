import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

// API methods
import * as API from "../api";

// Components
import Topography from "../components/Topography";
import Itinerary from "../components/Itinerary";
import Experiences from "../components/Experiences";
import TripMap from "../components/Map/TripMap";
import Search from "../components/Map/Search";
import Input from "../components/Input";
import Field from "../components/Field";

// Initial state
const INITIAL_STATE = {
  name: "",
  note: "",
  startDate: null,
  endDate: null,
  itinerary: [],
};

// Reducer logic
const tripReducer = (state, action) => {
  switch (action.type) {
    case "INIT_TRIP": {
      return action.payload;
    }

    case "SET_NAME": {
      return { ...state, name: action.payload };
    }

    case "SET_NOTE": {
      return { ...state, note: action.payload };
    }

    case "SET_START_DATE": {
      return { ...state, startDate: action.payload };
    }

    case "SET_END_DATE": {
      return { ...state, endDate: action.payload };
    }

    case "ADD_EVENT": {
      // Create new unassigned event object
      const newEvent = {
        id: uuidv4(),
        index: 0,
        date: null,
        time: { start: null, end: null },
        experience: action.payload.experience,
      };

      // Insert event into itinerary and update unassigned indices
      const itinerary = [newEvent, ...state.itinerary].map((event) => {
        if (event.id !== newEvent.id && !event.date) {
          return { ...event, index: event.index + 1 };
        } else {
          return event;
        }
      });

      return { ...state, itinerary };
    }

    case "MOVE_EVENT": {
      const { id, srcDate, srcIndex, dstDate, dstIndex } = action.payload;

      const itinerary = state.itinerary.map((event) => {
        // Target event
        if (event.id === id) {
          return { ...event, date: dstDate, index: dstIndex };
        }
        // Moving within date
        else if (event.date === srcDate && event.date === dstDate) {
          // Moving up
          if (srcIndex < dstIndex) {
            if (event.index > srcIndex && event.index <= dstIndex) {
              return { ...event, index: event.index - 1 };
            } else {
              return event;
            }
          }
          // Moving down
          else {
            if (event.index < srcIndex && event.index >= dstIndex) {
              return { ...event, index: event.index + 1 };
            } else {
              return event;
            }
          }
        }
        // Moving out of date
        else if (event.date === srcDate && event.date !== dstDate) {
          if (event.index > srcIndex) {
            return { ...event, index: event.index - 1 };
          } else {
            return event;
          }
        }
        // Moving into date
        else if (event.date !== srcDate && event.date === dstDate) {
          if (event.index >= dstIndex) {
            return { ...event, index: event.index + 1 };
          } else {
            return event;
          }
        }
        // Other events
        else {
          return event;
        }
      });

      return { ...state, itinerary };
    }

    case "REMOVE_EVENT": {
      // Find target event
      const targetEvent = state.itinerary.find(
        (event) => event.id === action.payload.id
      );

      // Remove event from itinerary
      let itinerary = state.itinerary.filter(
        (event) => event.id !== targetEvent.id
      );

      // Update event indices
      itinerary = itinerary.map((event) => {
        if (
          event.date === targetEvent.date &&
          event.index > targetEvent.index
        ) {
          return { ...event, index: event.index - 1 };
        } else {
          return event;
        }
      });

      return { ...state, itinerary };
    }

    case "SET_EVENT_TIME": {
      const { id, time } = action.payload;

      const itinerary = state.itinerary.map((event) => {
        if (event.id === id) {
          return { ...event, time };
        } else {
          return event;
        }
      });

      return { ...state, itinerary };
    }

    default: {
      return state;
    }
  }
};

const TripEditor = () => {
  // Router hooks
  const { tripId } = useParams();
  const navigate = useNavigate();

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [trip, dispatch] = useReducer(tripReducer, null);
  const [initialCoordinates, setInitialCoordinates] = useState(null);

  // Action creators
  const actions = {
    setName: (payload) => {
      dispatch({ type: "SET_NAME", payload });
    },
    setNote: (payload) => {
      dispatch({ type: "SET_NOTE", payload });
    },
    setStartDate: (payload) => {
      dispatch({ type: "SET_START_DATE", payload });
    },
    setEndDate: (payload) => {
      dispatch({ type: "SET_END_DATE", payload });
    },
    addEvent: (payload) => {
      dispatch({ type: "ADD_EVENT", payload });
    },
    moveEvent: (payload) => {
      dispatch({ type: "MOVE_EVENT", payload });
    },
    removeEvent: (payload) => {
      dispatch({ type: "REMOVE_EVENT", payload });
    },
    setEventTime: (payload) => {
      dispatch({ type: "SET_EVENT_TIME", payload });
    },
  };

  // Initialize trip on page load
  useEffect(() => {
    const initTrip = async () => {
      try {
        setLoading(true);
        const result = await API.getTrip({ tripId });
        dispatch({ type: "INIT_TRIP", payload: result });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId === "new") {
      dispatch({ type: "INIT_TRIP", payload: INITIAL_STATE });
    } else {
      initTrip();
    }
  }, [tripId]);

  return trip ? (
    trip.startDate && trip.endDate && initialCoordinates ? (
      <MainScreen
        trip={trip}
        actions={actions}
        initialCoordinates={initialCoordinates}
      />
    ) : (
      <SetupScreen
        trip={trip}
        actions={actions}
        initialCoordinates={initialCoordinates}
        setInitialCoordinates={setInitialCoordinates}
      />
    )
  ) : null;
};

const SetupScreen = (props) => {
  const { trip, actions, initialCoordinates, setInitialCoordinates } = props;

  const setCoordinates = ({ lat, lng }) => {
    setInitialCoordinates({
      center: { latitude: lat, longitude: lng },
      northEast: null,
      southWest: null,
    });
  };

  return (
    <SetupWrapper>
      <Topography />
      <SetupContainer>
        <SetupHeader>Your Adventure Awaits!</SetupHeader>
        <SetupInstructions>
          To get started, select a start and end date for your trip. Then use
          the search bar to pick a starting location. Don't worry if you change
          your mind, you can always update these settings later.
        </SetupInstructions>
        <SetupGroup>
          <Field id="start-date" isValid={trip.startDate}>
            <Input
              id="start-date"
              type="date"
              value={trip.startDate}
              onChange={actions.setStartDate}
            />
          </Field>
          <Field id="end-date" isValid={trip.endDate}>
            <Input
              id="end-date"
              type="date"
              value={trip.endDate}
              onChange={actions.setEndDate}
            />
          </Field>
        </SetupGroup>
        <Field id="location" isValid={initialCoordinates}>
          <Search setCoordinates={setCoordinates} />
        </Field>
      </SetupContainer>
    </SetupWrapper>
  );
};

const SetupWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const SetupContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 500px;
`;

const SetupHeader = styled.h1`
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 32px;
  text-align: center;
`;

const SetupInstructions = styled.p`
  margin: 20px 0 30px 0;
  text-align: center;
  color: ${({ theme }) => theme.neutral["600"]};
`;

const SetupGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const MainScreen = ({ trip, actions, initialCoordinates }) => {
  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Experience list state
  const [experiences, setExperiences] = useState([]);

  // Experience filter state
  const [keywords, setKeywords] = useState(["tourist_attraction"]);
  const [coordinates, setCoordinates] = useState(initialCoordinates);

  // Initialize experiences on keyword or coordinate update
  useEffect(() => {
    const getExperiences = async () => {
      try {
        setLoading(true);
        const result = await API.searchExperiences({ keywords, coordinates });
        setExperiences(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (coordinates.northEast && coordinates.southWest) {
      getExperiences();
    }
  }, [keywords, coordinates]);

  return (
    <MainContainer>
      <MainSidebar>
        <Itinerary
          startDate={trip.startDate}
          endDate={trip.endDate}
          itinerary={trip.itinerary}
          moveEvent={actions.moveEvent}
          removeEvent={actions.removeEvent}
          setEventTime={actions.setEventTime}
        />
        <Experiences
          loading={loading}
          experiences={experiences}
          addEvent={actions.addEvent}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      </MainSidebar>
      <MainContent>
        <TripMap
          loading={loading}
          experiences={experiences}
          itinerary={trip.itinerary}
          latitude={coordinates.center.latitude}
          longitude={coordinates.center.longitude}
          setCoordinates={setCoordinates}
        />
      </MainContent>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 940px 1fr;
`;

const MainSidebar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 420px 520px;
`;

const MainContent = styled.div`
  position: relative;
`;

export default TripEditor;
