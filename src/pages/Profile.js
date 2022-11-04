import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

// Context
import { UserContext } from "../App";

const Profile = () => {
  const [user] = useContext(UserContext);

  return user ? (
    <Container>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
    </Container>
  ) : (
    <Navigate to="/" />
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

export default Profile;
