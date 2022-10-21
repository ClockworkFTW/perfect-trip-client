import styled from "styled-components";

import Icon from "../Icon";

const Keyword = ({ prop, text, icon, isActive, onClick, margin }) => (
  <Container
    onClick={() => onClick(prop)}
    color={isActive ? "green" : "neutral"}
    margin={margin}
  >
    <Icon
      icon={icon}
      color={isActive ? "green" : "neutral"}
      shade={isActive ? "700" : "500"}
    />
    <Text>{text}</Text>
  </Container>
);

const Container = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme, color }) => theme[color]["700"]};
  background-color: ${({ theme, color }) => theme[color]["200"]};
  :hover {
    cursor: pointer;
  }
`;

const Text = styled.span`
  margin-left: 6px;
`;

export default Keyword;
