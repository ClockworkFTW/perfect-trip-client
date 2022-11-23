import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Options = React.forwardRef((props, ref) => {
  const { id, date, time, setEventTime, color } = props;

  // Get start and end of day
  const SOD = dayjs(date).startOf("day");
  const EOD = dayjs(date).endOf("day");

  let interval = SOD;
  const intervals = [];

  while (interval.isBefore(EOD)) {
    intervals.push(interval.format("h:mm A"));
    interval = interval.add(30, "minute");
  }

  const setStartTime = (start) => {
    setEventTime({
      id,
      time: {
        start: start === time.start ? null : start,
        end: time.end,
      },
    });
  };

  const setEndTime = (end) => {
    setEventTime({
      id,
      time: {
        start: time.start,
        end: end === time.end ? null : end,
      },
    });
  };

  return (
    <Wrapper ref={ref}>
      <Container>
        <Header>Start</Header>
        <Header>End</Header>
        <List>
          {intervals.map((interval, i) => (
            <Item
              key={i}
              color={color}
              isActive={interval === time.start}
              onClick={() => setStartTime(interval)}
            >
              {interval}
            </Item>
          ))}
        </List>
        <List>
          {intervals.map((interval, i) => (
            <Item
              key={i}
              color={color}
              isActive={interval === time.end}
              onClick={() => setEndTime(interval)}
            >
              {interval}
            </Item>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.neutral["300"]}`};
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.shadow_lg};
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 300px;
  column-gap: 10px;
`;

const Header = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #404040;
  text-align: center;
`;

const List = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Item = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  color: ${({ theme, color, isActive }) =>
    isActive ? theme[color]["500"] : theme.neutral["500"]};
  background-color: ${({ theme, color, isActive }) =>
    isActive ? theme[color]["100"] : "none"};
  :hover {
    cursor: pointer;
    font-weight: 700;
    color: ${({ theme, color }) => theme[color]["500"]};
  }
`;

export default Options;
