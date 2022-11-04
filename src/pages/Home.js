import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Components
import Button from "../components/Button";
import Icon from "../components/Icon";

// Context
import { UserContext } from "../App";

const Home = () => {
  const [user] = useContext(UserContext);

  const navigate = useNavigate();

  const onCreateTripClicked = () => {
    navigate("/trip/edit/new");
  };

  const onCreateExperienceClicked = () => {
    navigate("/experience/edit/new");
  };

  return user ? (
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
  ) : (
    <Container>
      <h1>Home</h1>
      <p>Please register an account to create trips and experiences.</p>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px;
`;

export default Home;
