import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import styled from "styled-components";

// API
import * as API from "../api";

// Components
import Itinerary from "../components/Itinerary";
import Experiences from "../components/Experiences";
import TripMap from "../components/Map/TripMap";

// Reducer
const tripReducer = (state, action) => {
  switch (action.type) {
    case "INIT_TRIP": {
      return action.payload;
    }

    case "SET_NAME": {
      return { ...state, name: action.payload.name };
    }

    case "SET_NOTE": {
      return { ...state, note: action.payload.note };
    }

    case "SET_START_DATE": {
      return { ...state, startDate: action.payload.startDate };
    }

    case "SET_END_DATE": {
      return { ...state, endDate: action.payload.endDate };
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
      const { experienceId, time } = action.payload;

      const itinerary = state.itinerary.map((event) =>
        event.experience.id === experienceId ? { ...event, time } : event
      );

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

  const [trip, dispatch] = useReducer(tripReducer, {
    name: "",
    note: "",
    startDate: dayjs(),
    endDate: dayjs().add(7, "day"),
    itinerary: [],
  });

  // Action Creators
  const setName = (payload) => {
    dispatch({ type: "SET_NAME", payload });
  };
  const setNote = (payload) => {
    dispatch({ type: "SET_NOTE", payload });
  };
  const setStartDate = (payload) => {
    dispatch({ type: "SET_START_DATE", payload });
  };
  const setEndDate = (payload) => {
    dispatch({ type: "SET_END_DATE", payload });
  };
  const addEvent = (payload) => {
    dispatch({ type: "ADD_EVENT", payload });
  };
  const moveEvent = (payload) => {
    dispatch({ type: "MOVE_EVENT", payload });
  };
  const removeEvent = (payload) => {
    dispatch({ type: "REMOVE_EVENT", payload });
  };
  const setEventTime = (payload) => {
    dispatch({ type: "SET_EVENT_TIME", payload });
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

    if (tripId !== "new") {
      initTrip();
    }
  }, [tripId]);

  // Experience list state
  const [experiences, setExperiences] = useState([]);

  // Experience filter state
  const [keywords, setKeywords] = useState(["tourist_attraction"]);
  const [coordinates, setCoordinates] = useState({
    center: { latitude: 37.7749, longitude: -122.4194 },
    northEast: null,
    southWest: null,
  });

  // Initialize experiences on page load and on keywords/coordinates update
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
    <Container>
      <Sidebar>
        <Itinerary
          startDate={trip.startDate}
          endDate={trip.endDate}
          itinerary={trip.itinerary}
          moveEvent={moveEvent}
          removeEvent={removeEvent}
          setEventTime={setEventTime}
        />
        <Experiences
          loading={loading}
          experiences={experiences}
          addEvent={addEvent}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      </Sidebar>
      <Main>
        <TripMap
          loading={loading}
          experiences={experiences}
          itinerary={trip.itinerary}
          latitude={coordinates.center.latitude}
          longitude={coordinates.center.longitude}
          setCoordinates={setCoordinates}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 940px 1fr;
`;

const Sidebar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 420px 520px;
`;

const Main = styled.div`
  position: relative;
`;

export default TripEditor;
