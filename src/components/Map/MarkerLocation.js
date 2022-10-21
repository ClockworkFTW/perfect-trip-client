import styled from "styled-components";

import Icon from "../Icon";

const MarkerLocation = ({ coords }) => (
  <Container>
    <Icon icon="location" color="green" shade="500" margin="0 8px 0 0" />
    {`${coords.lat}, ${coords.lng}`}
  </Container>
);

const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: 8px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.neutral["800"]};
  box-shadow: ${({ theme }) => theme.shadow_lg};
`;

export default MarkerLocation;
