import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import dayjs from "dayjs";

// Components
import Icon from "../Icon";
import Event from "./Event";

const colors = ["blue", "violet", "emerald", "rose", "amber", "cyan", "red"];

const Itinerary = (props) => {
  const {
    startDate,
    endDate,
    itinerary,
    moveEvent,
    removeEvent,
    setEventTime,
  } = props;

  // Get trip days
  const days = [...Array(dayjs(endDate).diff(startDate, "day"))].map((_, i) => {
    const day = dayjs(startDate).add(i, "day");
    const display = day.format("ddd, MMM D");
    const value = day.format("YYYY-MM-DD");
    const color = colors[i % 7];
    return { display, value, color };
  });

  const onDragEnd = (result) => {
    const id = result.draggableId;

    const srcIndex = result.source.index;
    const dstIndex = result.destination.index;

    let srcDate = result.source.droppableId;
    let dstDate = result.destination.droppableId;

    // No movement
    if (srcIndex === dstIndex && srcDate === dstDate) {
      return;
    }

    if (srcDate === "unassigned") {
      srcDate = null;
    }

    if (dstDate === "unassigned") {
      dstDate = null;
    }

    moveEvent({ id, srcDate, srcIndex, dstDate, dstIndex });
  };

  return (
    <Wrapper>
      <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Header>
              <Icon icon="earth-americas" color="neutral" shade="500" /> Things
              to Experience
            </Header>
            <Droppable droppableId="unassigned">
              {(provided, snapshot) => {
                const events = itinerary
                  .filter(({ date }) => !date)
                  .sort((a, b) => a.index - b.index);
                return (
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
                          removeEvent={removeEvent}
                          setEventTime={setEventTime}
                          color="green"
                        />
                      ))
                    ) : snapshot.isDraggingOver ? null : itinerary.length ? (
                      <Placeholder>
                        Your trip is looking great! Keep adding experiences to
                        your itinerary and when you're done press the save
                        button above.
                      </Placeholder>
                    ) : (
                      <Placeholder>
                        Currently your trip is looking a bit bare. To get
                        started, add some experiences to your itinerary from the
                        list to the right.
                      </Placeholder>
                    )}
                    {provided.placeholder}
                    {events.length || snapshot.isDraggingOver ? (
                      <Spacer
                        color={snapshot.isDraggingOver ? "green" : "neutral"}
                      >
                        <Icon icon="ellipsis" />
                      </Spacer>
                    ) : null}
                  </Content>
                );
              }}
            </Droppable>
          </div>
          {days.map((day) => (
            <div key={day.value}>
              <Header>
                <Icon icon="calendar-days" color="neutral" shade="500" />{" "}
                {day.display}
              </Header>
              <Droppable droppableId={day.value}>
                {(provided, snapshot) => {
                  const events = itinerary
                    .filter(({ date }) => dayjs(date).isSame(day.value, "day"))
                    .sort((a, b) => a.index - b.index);
                  return (
                    <Content
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                      color={day.color}
                    >
                      {events.length ? (
                        events.map((event) => (
                          <Event
                            key={event.id}
                            event={event}
                            removeEvent={removeEvent}
                            setEventTime={setEventTime}
                            color={day.color}
                          />
                        ))
                      ) : snapshot.isDraggingOver ? null : (
                        <Placeholder>
                          Drag and drop your experiences here.
                        </Placeholder>
                      )}
                      {provided.placeholder}
                      {events.length || snapshot.isDraggingOver ? (
                        <Spacer
                          color={
                            snapshot.isDraggingOver ? day.color : "neutral"
                          }
                        >
                          <Icon icon="ellipsis" />
                        </Spacer>
                      ) : null}
                    </Content>
                  );
                }}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
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

const Header = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["800"]};
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

export default Itinerary;
