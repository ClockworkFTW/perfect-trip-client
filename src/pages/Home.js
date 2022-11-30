import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Components
import Button from "../components/Button";
import BucketList from "../components/BucketList";
import Topography from "../components/Topography";

// Context
import { UserContext } from "../App";

const Home = () => {
  const [user] = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Topography />
      {user ? (
        <BucketList />
      ) : (
        <Center>
          <Header>Welcome to Perfect Trip!</Header>
          <Message>
            To create trips and experiences please login or register an account
          </Message>
          <div>
          <Button onClick={() => navigate("/experience/browse")}>Browse Experiences</Button>
          </div>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Center>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 46px;
`;

const Message = styled.p`
  margin-bottom: 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

export default Home;
