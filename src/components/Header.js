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

  const onLoginClicked = () => {
    navigate("/login");
  };

  const onLogoutClicked = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Wrapper ref={headerRef}>
      <Container>
        <Group>
          <Logo to="/">Perfect Trip</Logo>
        </Group>
        {user ? (
          <Group>
            <Image src={user.avatar}/>
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
  max-width: 100%;
  margin: 0 auto;
  padding: 10px 30px;
`;

const Group = styled.div`
`;

const Username = styled(Link)`
  margin-right: 8px;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 32px;
`;

const Image = styled.img`
display: inline-block;
margin-bottom: -15px;
margin-right: 12px;
padding: 0;
aspect-ratio: 1 / 1;
width: 40px;
border-radius: 8px;
background-color: ${({ theme }) => theme.white};`


export default Header;
