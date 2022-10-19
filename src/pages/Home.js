import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/Button";
import Icon from "../components/Icon";

const Home = () => {
  const navigate = useNavigate();

  const onCreateTripClicked = () => {
    navigate("/trip/edit/new");
  };

  const onCreateExperienceClicked = () => {
    navigate("/experience/edit/new");
  };

  return (
    <Container>
      <h1>Home</h1>
      <div>
        <Button onClick={onCreateTripClicked}>
          <Icon icon="plus" margin="0 8px 0 0" />
          Plan New Trip
        </Button>
      </div>
      <div>
        <Button onClick={onCreateExperienceClicked}>
          <Icon icon="plus" margin="0 8px 0 0" />
          Create New Experience
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

export default Home;
