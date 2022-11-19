import { useEffect, useState } from "react";
import styled from "styled-components";

import * as API from "../api";

import Itinerary from "../components/Itinerary";
import Experiences from "../components/Experiences";
import TripMap from "../components/Map/TripMap";

const TripEditor = () => {
  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Experience list state
  const [experiences, setExperiences] = useState([]);

  // Experience filter state
  const [keywords, setKeywords] = useState([]);
  const [coordinates, setCoordinates] = useState({
    center: { latitude: 37.7749, longitude: -122.4194 },
    northEast: null,
    southWest: null,
  });

  // Initialize experience on page load
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

  // Itinerary state
  const [itinerary, setItinerary] = useState({ name: "", experiences: [] });

  const addExperienceToItinerary = (experience) =>
    setItinerary({
      ...itinerary,
      experiences: [...itinerary.experiences, experience],
    });

  console.log(experiences);

  return (
    <Container>
      <Sidebar>
        <Itinerary itinerary={itinerary} setItinerary={setItinerary} />
        <Experiences
          loading={loading}
          experiences={experiences}
          addExperienceToItinerary={addExperienceToItinerary}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      </Sidebar>
      <Main>
        <TripMap
          loading={loading}
          experiences={experiences}
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
  grid-template-columns: 840px 1fr;
`;

const Sidebar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 320px 520px;
`;

const Main = styled.div`
  position: relative;
`;

export default TripEditor;
