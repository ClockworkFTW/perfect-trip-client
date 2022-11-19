import { useState, useContext } from "react";
import { Navigate, Link as A } from "react-router-dom";
import styled from "styled-components";
import jwtDecode from "jwt-decode";

// API
import * as API from "../api";

// Components
import Topography from "../components/Topography";
import Button from "../components/Button";
import Error from "../components/Error";
import Label from "../components/Label";
import Input from "../components/Input";
import Icon from "../components/Icon";

// Context
import { UserContext } from "../App";

const Login = () => {
  // User context
  const [user, setUser] = useContext(UserContext);

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  // TODO: Move to child component to stop unnecessary renders
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const onLoginClicked = async () => {
    try {
      // Build credentials object
      const credentials = { email, password };

      // Login with credentials
      setLoading(true);
      const result = await API.login({ credentials });

      // Save token to local storage
      localStorage.setItem("token", result);
      const payload = jwtDecode(result);

      // Update user context
      setUser({ ...payload, result });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Wrapper>
      <Topography />
      <Container>
        <Header>Welcome Back!</Header>
        {error && <Error error={error} />}
        <Field>
          <Label id="email" text="Email">
            <Icon icon="envelope" color="neutral" shade="500" />
          </Label>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="name@domain.com"
            value={email}
            onChange={setEmail}
          />
        </Field>
        <Field>
          <Label id="password" text="Password">
            <Icon icon="lock-keyhole" color="neutral" shade="500" />
          </Label>
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="secret..."
            value={password}
            onChange={setPassword}
          />
        </Field>
        <Button onClick={onLoginClicked} width="100%">
          {loading ? "Loading..." : "Login"}
        </Button>
        <Footer>
          Don't have an account yet? <Link to="/register">Register now</Link>.
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

const Footer = styled.p`
  margin-top: 26px;
  text-align: center;
  color: ${({ theme }) => theme.neutral["400"]};
`;

const Link = styled(A)`
  color: ${({ theme }) => theme.green["500"]};
`;

export default Login;
