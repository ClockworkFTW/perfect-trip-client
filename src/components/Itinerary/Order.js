import { useState } from "react";
import styled from "styled-components";

// Components
import Icon from "../Icon";

const Order = ({ index, color, removeEvent }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Container
      onClick={removeEvent}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Content>{isHovering ? <Icon icon="times" /> : index + 1}</Content>
      <Icon icon="location-pin" color={color} shade="500" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-block;
  font-size: 34px;
  :hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  font-weight: bold;
`;

export default Order;
