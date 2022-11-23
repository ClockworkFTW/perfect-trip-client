import { useState } from "react";
import styled from "styled-components";

const Order = ({ time, setEventTime, color }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container color={color} onClick={() => setIsEditing(true)}>
      Add Time
    </Container>
  );
};

const Container = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme, color }) => theme[color]["500"]};
  background-color: ${({ theme, color }) => theme[color]["100"]};
  :hover {
    cursor: pointer;
  }
`;

export default Order;
