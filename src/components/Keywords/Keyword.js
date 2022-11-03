import styled from "styled-components";

import Icon from "../Icon";

const Keyword = ({ text, icon, isActive }) => (
  <Container color={isActive ? "green" : "neutral"}>
    <Icon
      icon={icon}
      color={isActive ? "green" : "neutral"}
      shade={isActive ? "700" : "500"}
    />
    <Text>{text}</Text>
  </Container>
);

const Container = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme, color }) => theme[color]["700"]};
  background-color: ${({ theme, color }) => theme[color]["200"]};
`;

const Text = styled.span`
  margin-left: 6px;
`;

export default Keyword;
