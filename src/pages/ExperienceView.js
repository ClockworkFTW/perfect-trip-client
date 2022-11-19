import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// API
import * as API from "../api";

const ExperienceView = () => {
  const { experienceId } = useParams();

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Experience state
  const [experience, setExperience] = useState(null);

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize experience
  useEffect(() => {
    const initExperience = async () => {
      try {
        setLoading(true);
        const result = await API.getExperience({ experienceId });
        setExperience(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      initExperience(experienceId);
    }
  }, [experienceId]);

  return experience ? (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={() => navigate(`/experience/edit/${experience.id}`)}>
        Edit
      </button>
      <h1>Title: {experience.title}</h1>
      <p>Description: {experience.description}</p>
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
`;

export default ExperienceView;
