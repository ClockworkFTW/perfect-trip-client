import styled from "styled-components";

import Icon from "./Icon";

const Rating = ({ rating }) => (
  <Container>
    <Icon icon="star" color="yellow" shade="400" />
    <Text>{rating ? rating : 0}</Text>
  </Container>
);

const Container = styled.div``;

const Text = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

export default Rating;
