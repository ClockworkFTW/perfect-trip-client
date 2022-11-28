import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import Icon from "../Icon";

const Trip = ({ trip }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/trip/edit/${trip.id}`);
  };

  const startDate = dayjs(trip.startDate).format("MMM M");
  const endDate = dayjs(trip.endDate).format("MMM M");

  return (
    <Container onClick={onClick}>
      <Content>
        <Header>{trip.name}</Header>
        <Dates>
          {startDate} - {endDate}
        </Dates>
      </Content>
      <Count>
        <Icon color="neutral" shade="500" icon="earth-americas" />
        <Text>{trip.itinerary.length} Experiences</Text>
      </Count>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }
`;

const Content = styled.div`
  margin-bottom: 10px;
`;

const Header = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Dates = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

const Count = styled.div`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.neutral["700"]};
  background-color: ${({ theme }) => theme.neutral["200"]};
`;

const Text = styled.span`
  margin-left: 6px;
`;

export default Trip;
