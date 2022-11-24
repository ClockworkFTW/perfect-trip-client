import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Components
import Button from "../components/Button";

// Context
import { UserContext } from "../App";

const Home = () => {
  const [user] = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Header>Perfect Trip</Header>
        {user ? (
          <>
            <Button onClick={() => navigate("/trip/edit/new")}>
              Plan a Trip
            </Button>
            <Button onClick={() => navigate("/experience/edit/new")}>
              Create an Experience
            </Button>
          </>
        ) : (
          <Message>
            To create trips and experiences please register an account
          </Message>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["800"]};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.white};
  font-family: "Lilita One", cursive;
  font-size: 46px;
`;

const Message = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.neutral["300"]};
`;

export default Home;
