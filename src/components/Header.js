import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";

const Header = ({ headerRef }) => {
  const navigate = useNavigate();

  const onLoginClicked = () => {
    navigate("/login");
  };

  return (
    <Wrapper ref={headerRef}>
      <Container>
        <Group>
          <Logo to="/">Perfect Trip</Logo>
        </Group>
        <Group>
          <Button onClick={onLoginClicked}>Login</Button>
        </Group>
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
`;

const Group = styled.div``;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.neutral["700"]};
  font-family: "Lilita One", cursive;
  font-size: 32px;
`;

export default Header;
