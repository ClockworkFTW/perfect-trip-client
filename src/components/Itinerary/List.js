import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import dayjs from "dayjs";

// Components
import Icon from "../Icon";
import Event from "./Event";

export const ListA = ({ actions, itinerary }) => {
  const events = itinerary
    .filter(({ date }) => !date)
    .sort((a, b) => a.index - b.index);

  return (
    <div>
      <HeaderIcon>
        <Icon icon="earth-americas" />
      </HeaderIcon>
      <HeaderText>Things to Experience</HeaderText>
      <Droppable droppableId="unassigned">
        {(provided, snapshot) => (
          <Content
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            color="green"
          >
            {events.length ? (
              events.map((event) => (
                <Event
                  key={event.id}
                  event={event}
                  actions={actions}
                  color="green"
                />
              ))
            ) : snapshot.isDraggingOver ? null : itinerary.length ? (
              <Placeholder>
                Your trip is looking great! Keep adding experiences to your
                itinerary and when you're done press the save button above.
              </Placeholder>
            ) : (
              <Placeholder>
                Currently your trip is looking a bit bare. To get started, add
                some experiences to your itinerary from the list to the right.
              </Placeholder>
            )}
            {provided.placeholder}
            {events.length || snapshot.isDraggingOver ? (
              <Spacer color={snapshot.isDraggingOver ? "green" : "neutral"}>
                <Icon icon="ellipsis" />
              </Spacer>
            ) : null}
          </Content>
        )}
      </Droppable>
    </div>
  );
};

export const ListB = ({ actions, list, itinerary }) => {
  const events = itinerary
    .filter(({ date }) => dayjs(date).isSame(list.id, "day"))
    .sort((a, b) => a.index - b.index);

  return (
    <Container>
      <HeaderIcon>
        <Icon icon="calendar-days" />
      </HeaderIcon>
      <HeaderText>{list.header}</HeaderText>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <Content
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            color={list.color}
          >
            {events.length ? (
              events.map((event) => (
                <Event
                  key={event.id}
                  event={event}
                  actions={actions}
                  color={list.color}
                />
              ))
            ) : snapshot.isDraggingOver ? null : (
              <Placeholder>Drag and drop your experiences here.</Placeholder>
            )}
            {provided.placeholder}
            {events.length || snapshot.isDraggingOver ? (
              <Spacer color={snapshot.isDraggingOver ? list.color : "neutral"}>
                <Icon icon="ellipsis" />
              </Spacer>
            ) : null}
          </Content>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div``;

const HeaderIcon = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["400"]};
`;

const HeaderText = styled.span`
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

const Content = styled.div`
  margin: 10px 0;
  padding: 0 10px;
  border-radius: 8px;
  border: ${({ theme, isDraggingOver, color }) =>
    isDraggingOver
      ? `2px dashed ${theme[color]["400"]}`
      : `2px solid ${theme.neutral["100"]}`};
  background-color: ${({ theme, isDraggingOver, color }) =>
    isDraggingOver ? theme[color]["100"] : theme.neutral["100"]};
`;

const Placeholder = styled.p`
  padding: 10px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.neutral["500"]};
`;

const Spacer = styled.div`
  text-align: center;
  font-size: 20px;
  color: ${({ theme, color }) => theme[color]["300"]};
`;
