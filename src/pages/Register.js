import { useState } from "react";
import { Link as A } from "react-router-dom";
import styled from "styled-components";

import Topography from "../components/Topography";
import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");

  const onRegisterClicked = () => {
    alert(
      `
      email: ${email}
      username: ${username}
      passwordA: ${passwordA}
      passwordB: ${passwordB}
      `
    );
  };

  return (
    <Wrapper>
      <Topography />
      <Container>
        <Header>Welcome Back!</Header>
        <Field>
          <Label htmlFor="email">
            <Icon
              icon="envelope"
              margin="0 4px 0 0"
              color="neutral"
              shade="500"
            />
            Email
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
          <Label htmlFor="username">
            <Icon icon="user" margin="0 4px 0 0" color="neutral" shade="500" />
            Username
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
          <Label htmlFor="passwordA">
            <Icon
              icon="lock-keyhole"
              margin="0 4px 0 0"
              color="neutral"
              shade="500"
            />
            Password
          </Label>
          <Input
            id="passwordA"
            type="password"
            label="Password"
            placeholder="secret..."
            value={passwordA}
            onChange={setPasswordA}
          />
        </Field>
        <Field>
          <Label htmlFor="passwordB">
            <Icon
              icon="lock-keyhole"
              margin="0 4px 0 0"
              color="neutral"
              shade="500"
            />
            Confirm Password
          </Label>
          <Input
            id="passwordB"
            type="password"
            label="Password"
            placeholder="must match password"
            value={passwordB}
            onChange={setPasswordB}
          />
        </Field>
        <Button onClick={onRegisterClicked} width="100%">
          Register
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

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
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
