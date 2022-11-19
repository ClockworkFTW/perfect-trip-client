import styled from "styled-components";

import Icon from "./Icon";

const Error = ({ error }) => (
  <Container>
    <Icon icon="warning" margin="0 12px 0 0" />
    {error}
  </Container>
);

const Container = styled.div`
  margin-bottom: 20px;
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.red["500"]};
`;

export default Error;
