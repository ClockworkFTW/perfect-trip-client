import { useState, useReducer ,useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

// API
import * as API from "../api";

// components
import Topography from "../components/Topography";
import Button from "../components/Button";
import Label from "../components/Label";
import Input from "../components/Input";
import Icon from "../components/Icon";
import Image from "../components/Image"

// Context
import { UserContext } from "../App";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");
  const [username, setUsername] = useState("");
  const [passwordD, setPasswordD] = useState("");
  const [avatar, setAvatar] = useState("");


  const onUpdateUserClicked = async () => {
    try {
      const data = { username };
      setLoading(true);
      const result = await API.updateUsername({ data });
      localStorage.setItem("token", result);
      const payload = jwtDecode(result);
      setUser({ ...payload, result });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateAvatarClicked = async () => {
    try {
      const data = { avatar };
      setLoading(true);
      const result = await API.updateAvatar({ data });
      localStorage.setItem("token", result);
      const payload = jwtDecode(result);
      setUser({ ...payload, result });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePassClicked = async () => {
    try {
      const passwords = { password, passwordA, passwordB };
      setLoading(true);
      const result = await API.updatePassword({ passwords });
      const messageP = document.getElementById("message");
      messageP.innerText = result;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteClicked = async () => {
    try {
      const deletePass = { passwordD };
      setLoading(true);
      const result = await API.deleteAccount({ deletePass });
      setUser(null)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addImage = (image) => {
    console.log(image)
    setAvatar(image);
  };

  const removeImage = () => {
    setAvatar("");
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
            {loading ? "Loading..." : "Update Username"}
          </Button>
        </Container>
        <Container>
          <h3>Change Avatar</h3>
          <Field id="images">
            <Label id="avatar" text="Avatar">
              <Icon icon="user" color="neutral" shade="500" />
            </Label>
            <Image
              imageA={avatar}
              addImage={addImage}
              removeImage={removeImage}
            />
          </Field>
          <Button onClick={onUpdateAvatarClicked} width="100%">
            {loading ? "Loading..." : "Update Avatar"}
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
            {loading ? "Loading..." : "Update Password"}
          </Button>
          <p id="message" style={{ textAlign: 'center', fontSize: '20px'}} ></p>
      </Container>
      <Container>
        <h3>Delete Account</h3>
        <Field>
          <Label id="password" text="Current Password">
            <Icon icon="lock-keyhole" color="neutral" shade="500" />
          </Label>
          <Input
            id="passwordD"
            type="password"
            label="Password"
            placeholder="password"
            value={passwordD}
            onChange={setPasswordD}
          />
        </Field>
        <Button onClick={onDeleteClicked} width="100%">
          {loading ? "Loading..." : "Delete Account"}
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
