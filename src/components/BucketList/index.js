import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// API
import * as API from "../../api";

// Components
import Trip from "./Trip";
import Experience from "./Experience";
import Button from "../Button";
import Error from "../Error";

const BucketList = () => {
  // Router hooks
  const navigate = useNavigate();

  // Trips state
  const [trips, setTrips] = useState([]);

  // API loading and error state
  const [tripsLoading, setTripsLoading] = useState(false);
  const [tripsError, setTripsError] = useState(null);

  // Initialize trips
  useEffect(() => {
    const getTrips = async () => {
      try {
        setTripsLoading(true);
        const result = await API.getTrips();
        setTrips(result);
      } catch (error) {
        setTripsError(error);
      } finally {
        setTripsLoading(false);
      }
    };

    getTrips();
  }, []);

  // Experiences state
  const [experiences, setExperiences] = useState([]);

  // API loading and error state
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [experiencesError, setExperiencesError] = useState(null);

  // Initialize experiences
  useEffect(() => {
    const getExperiences = async () => {
      try {
        setExperiencesLoading(true);
        const result = await API.getExperiences();
        setExperiences(result);
      } catch (error) {
        setExperiencesError(error);
      } finally {
        setExperiencesLoading(false);
      }
    };

    getExperiences();
  }, []);

  return (
    <Container>
      <Banner>
        <Header>My Trips</Header>
        <Button onClick={() => navigate("/trip/edit/new")}>Create Trip</Button>
      </Banner>
      {tripsError && <Error error={tripsError} />}
      {tripsLoading ? (
        <p>Loading...</p>
      ) : trips.length ? (
        <Grid>
          {trips.map((trip) => (
            <Trip trip={trip} />
          ))}
        </Grid>
      ) : (
        <p>No Trips...</p>
      )}
      <Banner>
        <Header>My Experiences</Header>
        <Button onClick={() => navigate("/experience/edit/new")}>
          Create Experience
        </Button>
      </Banner>
      {experiencesError && <Error error={experiencesError} />}
      {experiencesLoading ? (
        <p>Loading...</p>
      ) : experiences.length ? (
        <Grid>
          {experiences.map((experience) => (
            <Experience experience={experience} />
          ))}
        </Grid>
      ) : (
        <p>No Experiences...</p>
      )}
      <Banner>
        <Header>Browse Experiences</Header>
        <Button onClick={() => navigate("/experience/browse")}>Browse</Button>
      </Banner>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const Header = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

export default BucketList;
