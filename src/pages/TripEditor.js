import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import dayjs from "dayjs";

// API methods
import * as API from "../api";

// Components
import Topography from "../components/Topography";
import TripForm from "../components/TripForm";
import ExperienceList from "../components/ExperienceList";
import TripMap from "../components/Map/TripMap";
import Search from "../components/Map/Search";
import Input from "../components/Input";
import Field from "../components/Field";

// Context
import { UserContext } from "../App";

// Reducer logic
const tripReducer = (state, action) => {
  switch (action.type) {
    case "INIT_TRIP": {
      return action.payload;
    }

    case "SET_NAME": {
      return { ...state, name: action.payload };
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
  // User context
  const [user] = useContext(UserContext);

  // Router hooks
  const { tripId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
    const getTrip = async () => {
      try {
        setLoading(true);
        const result = await API.getTrip({ tripId });
        setInitialCoordinates(result.initialCoordinates);
        dispatch({ type: "INIT_TRIP", payload: result });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Initialize new trip
    if (tripId === "new") {
      const payload = {
        id: tripId,
        name: "",
        startDate: null,
        endDate: null,
        itinerary: [],
        members: [user],
      };
      dispatch({ type: "INIT_TRIP", payload });
    }

    // Get existing trip
    else {
      if (location.state?.trip) {
        setInitialCoordinates(location.state.trip.initialCoordinates);
        dispatch({ type: "INIT_TRIP", payload: location.state.trip });
      } else {
        getTrip({ tripId });
      }
    }
  }, [tripId]);

  // Handle trip creation and updates
  const saveTrip = async () => {
    if (tripId !== "new") {
      try {
        setLoading(true);
        const result = await API.updateTrip({ trip });
        dispatch({ type: "INIT_TRIP", payload: result });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const result = await API.createTrip({ trip });
        navigate(`/trip/edit/${result.id}`, { state: { experience: result } });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle trip deletion
  const deleteTrip = async () => {
    try {
      setLoading(true);
      await API.deleteTrip({ tripId });
      navigate(`/`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return trip ? (
    trip.startDate && trip.endDate && initialCoordinates ? (
      <MainScreen
        actions={actions}
        trip={trip}
        saveTrip={saveTrip}
        deleteTrip={deleteTrip}
        initialCoordinates={initialCoordinates}
      />
    ) : (
      <SetupScreen
        actions={actions}
        trip={trip}
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

const MainScreen = (props) => {
  const { actions, trip, saveTrip, deleteTrip, initialCoordinates } = props;

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

  // Get trip date count
  const dateCount = dayjs(trip.endDate).diff(trip.startDate, "day") + 1;

  const colors = ["blue", "violet", "yellow", "pink", "orange", "cyan", "red"];

  // Generate a list for each date
  const lists = [...Array(dateCount)].map((_, i) => {
    const date = dayjs(trip.startDate).add(i, "day");
    const id = date.format("YYYY-MM-DD");
    const color = colors[i % colors.length];
    const header = date.format("ddd, MMM D");
    return { id, color, header };
  });

  return (
    <MainContainer>
      <MainSidebar>
        <TripForm
          actions={actions}
          lists={lists}
          trip={trip}
          saveTrip={saveTrip}
          deleteTrip={deleteTrip}
        />
        <ExperienceList
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
          lists={lists}
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
  z-index: 1;
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 420px 520px;
  box-shadow: ${({ theme }) => theme.shadow_2xl};
`;

const MainContent = styled.div`
  position: relative;
`;

export default TripEditor;
