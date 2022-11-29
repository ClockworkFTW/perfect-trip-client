import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Experiences from "../components/Experiences";
import BrowseMap from "../components/Map/BrowseMap";

import * as API from "../api";

// Components
import Button from "../components/Button";
import Icon from "../components/Icon";

// Context
import { UserContext } from "../App";

const Browser = () => {
  const [user] = useContext(UserContext);
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
  const navigate = useNavigate();

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
        <Experiences
          loading={loading}
          experiences={experiences}
          keywords={keywords}
        />
      </Sidebar>
      <Main>
      <BrowseMap
        loading={loading}
        experiences={experiences}
        latitude={37.7749}
        longitude={-122.4194}
        setCoordinates={setCoordinates}/>
      />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 520px 1fr;
`;

const Sidebar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 520px;
`;

const Main = styled.div`
  position: relative;
`;

export default Browser;
