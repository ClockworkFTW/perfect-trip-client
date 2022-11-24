import styled from "styled-components";

// Components
import Itinerary from "../Itinerary";
import Button from "../Button";
import Input from "../Input";
import Field from "../Field";

const TripForm = ({ actions, lists, trip, saveTrip }) => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Field id="name" isValid={trip.name}>
            <Input
              id="name"
              type="text"
              value={trip.name}
              onChange={actions.setName}
            />
          </Field>
          <Group>
            <Field id="start-date" isValid={trip.startDate}>
              <Input
                id="start-date"
                type="date"
                value={trip.startDate}
                onChange={actions.setStartDate}
              />
            </Field>
            <Field id="end-date" isValid={trip.endDate}>
              <Input
                id="end-date"
                type="date"
                value={trip.endDate}
                onChange={actions.setEndDate}
              />
            </Field>
          </Group>
          <Button width="100%" onClick={saveTrip}>
            Save
          </Button>
        </Content>
        <Itinerary actions={actions} lists={lists} itinerary={trip.itinerary} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-right: ${({ theme }) => `1px solid ${theme.neutral["300"]}`};
  background-color: ${({ theme }) => theme.white};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Content = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`;

export default TripForm;
