import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

// API
import * as API from "../api";
import useMutation from "../api/useMutation";

// components
import Topography from "../components/Topography";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import Icon from "../components/Icon";

// Context
import { UserContext } from "../App";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");
  const [username, setUsername] = useState("");

  const [
    updateUsername,
    {
      data: { token },
      pending,
      error,
    },
  ] = useMutation(API.updateUsername, {
    token: null,
  });

  const onUpdateUserClicked = () => {
    const avatar = {
      username
    };
    updateUsername({ avatar });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const payload = jwtDecode(token);
      setUser({ ...payload, token });
    }
  }, [token]);

  const [
    updatePassword,
    {
      data: { pass },
      pendingPass,
      errorPass,
    },
  ] = useMutation(API.updatePassword, {
    pass: null,
  });

  const onUpdatePassClicked = () => {
    const credentials = {
      password,
      passwordA,
      passwordB
    };
    updatePassword({ credentials }).then(resp => console.log(resp))
  };


  return user ? (
      <Wrapper>
        <Container>
          <h1>Options</h1>
          <h3>Change Username</h3>
          <Field>
            <Label id="user" text="Username">
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
          <Button onClick={onUpdateUserClicked} width="100%">
            {pending ? "Loading..." : "Update"}
          </Button>
        </Container>
        <Container>
          <h3>Change Password </h3>
          <Field>
            <Label id="password" text="Current Password">
              <Icon icon="lock-keyhole" color="neutral" shade="500" />
            </Label>
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="password"
              value={password}
              onChange={setPassword}
            />
          </Field>
          <Field>
            <Label id="passwordA" text="New Password">
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
          <Button onClick={onUpdatePassClicked} width="100%">
            {pendingPass ? "Loading..." : "Update"}
          </Button>
      </Container>
    </Wrapper>
  ) : (
    <Navigate to="/" />
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

export default Profile;
