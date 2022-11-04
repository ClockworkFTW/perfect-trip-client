import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

// Components
import Button from "./Button";

// Context
import { UserContext } from "../App";

const Header = ({ headerRef }) => {
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const isEditing =
    location.pathname.includes("/experience/edit") ||
    location.pathname.includes("/trip/edit");

  const maxWidth = isEditing ? "100%" : "1200px";

  const onLoginClicked = () => {
    navigate("/login");
  };

  const onLogoutClicked = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Wrapper ref={headerRef}>
      <Container maxWidth={maxWidth}>
        <Group>
          <Logo to="/">Perfect Trip</Logo>
        </Group>
        {user ? (
          <Group>
            <Username to={`/profile/${user.userId}`}>{user.username}</Username>
            <Button onClick={onLogoutClicked}>Logout</Button>
          </Group>
        ) : (
          <Group>
            <Button onClick={onLoginClicked}>Login</Button>
          </Group>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.neutral["300"]};
`;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
  padding: 10px 30px;
`;

const Group = styled.div``;

const Username = styled(Link)`
  margin-right: 8px;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 32px;
`;

export default Header;
