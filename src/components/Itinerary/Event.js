import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// Components
import Order from "./Order";
import Time from "./Time";
import Rating from "../Rating";
import Keyword from "../Keywords/Keyword";

// Config
import { KEYWORDS } from "../../config";

const Event = ({ event, removeEvent, setEventTime, color }) => {
  const { id, index, experience, date, time } = event;

  const keyword = KEYWORDS[experience.keywords[0]];

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Header>
            <Order
              index={index}
              removeEvent={() => removeEvent({ id })}
              color={color}
            />
            <Title isDragging={snapshot.isDragging}>{experience.title}</Title>
            {date && (
              <Time
                id={id}
                date={date}
                time={time}
                setEventTime={setEventTime}
                color={color}
              />
            )}
          </Header>
          <Main>
            <Image url={experience.images[0]} />
            <Content>
              <Description isDragging={snapshot.isDragging}>
                {experience.description
                  ? experience.description
                  : "No description..."}
              </Description>
              <Footer>
                <Keyword text={keyword.text} icon={keyword.icon} />
                <Rating rating={experience.rating} />
              </Footer>
            </Content>
          </Main>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  margin-top: 10px;
  padding: 4px 12px 12px 12px;
  border-radius: 8px;
  background-color: ${({ theme, isDragging }) =>
    isDragging ? theme.neutral["800"] : theme.white};
  color: ${({ theme, isDragging }) =>
    isDragging ? theme.white : theme.neutral["800"]};
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: ${({ theme }) => theme.shadow_lg};
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  flex: 100%;
  margin: 0 10px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, isDragging }) =>
    isDragging ? theme.white : theme.neutral["700"]};
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-template-rows: 90px;
  gap: 16px;
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 14px;
  color: ${({ theme, isDragging }) =>
    theme.neutral[isDragging ? "200" : "500"]};
`;

export default Event;
