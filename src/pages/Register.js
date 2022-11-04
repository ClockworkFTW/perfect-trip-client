import { useEffect, useState, useContext } from "react";
import { Navigate, Link as A } from "react-router-dom";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

// API
import * as API from "../api";
import useMutation from "../api/useMutation";

// Components
import Topography from "../components/Topography";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import Icon from "../components/Icon";

// Context
import { UserContext } from "../App";

const Login = () => {
  const [user, setUser] = useContext(UserContext);

  // TODO: Move to child component to stop unnecessary renders
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");

  const [
    register,
    {
      data: { token },
      pending,
      error,
    },
  ] = useMutation(API.register, {
    token: null,
  });

  const onRegisterClicked = () => {
    const credentials = {
      email,
      username,
      passwordA,
      passwordB,
    };
    register({ credentials });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const payload = jwtDecode(token);
      setUser({ ...payload, token });
    }
  }, [token]);

  return user ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Wrapper>
      <Topography />
      <Container>
        <Header>Hello There, Traveler!</Header>
        {error && (
          <Error>
            <Icon icon="warning" margin="0 12px 0 0" />
            {error}
          </Error>
        )}
        <Field>
          <Label id="email" text="Email">
            <Icon icon="envelope" color="neutral" shade="500" />
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={setEmail}
          />
        </Field>
        <Field>
          <Label id="username" text="Username">
            <Icon icon="user" color="neutral" shade="500" />
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={setUsername}
          />
        </Field>
        <Field>
          <Label id="passwordA" text="Password">
            <Icon icon="lock-keyhole" color="neutral" shade="500" />
          </Label>
          <Input
            id="passwordA"
            type="password"
            label="Password"
            placeholder="password"
            value={passwordA}
            onChange={setPasswordA}
          />
        </Field>
        <Field>
          <Label id="passwordB" text="Confirm Password">
            <Icon icon="lock-keyhole" color="neutral" shade="500" />
          </Label>
          <Input
            id="passwordB"
            type="password"
            label="Password"
            placeholder="password"
            value={passwordB}
            onChange={setPasswordB}
          />
        </Field>
        <Button onClick={onRegisterClicked} width="100%">
          {pending ? "Loading..." : "Register"}
        </Button>
        <Footer>
          Already have an account? <Link to="/login">Login now</Link>.
        </Footer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 32px;
  text-align: center;
`;

const Error = styled.div`
  margin-bottom: 20px;
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.red["500"]};
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Footer = styled.p`
  margin-top: 26px;
  text-align: center;
  color: ${({ theme }) => theme.neutral["400"]};
`;

const Link = styled(A)`
  color: ${({ theme }) => theme.green["500"]};
`;

export default Login;
