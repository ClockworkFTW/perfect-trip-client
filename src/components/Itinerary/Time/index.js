import { useState } from "react";
import styled from "styled-components";

// Components
import Options from "./Options";

// Hooks
import { useOutsideClick } from "../../../hooks";

const Time = ({ id, date, time, setEventTime, color }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const showOptions = () => setOptionsVisible(true);
  const hideOptions = () => setOptionsVisible(false);

  const ref = useOutsideClick(hideOptions);

  const renderButtonText = () => {
    if (time.start && time.end) {
      return `${time.start} - ${time.end}`;
    } else if (time.start && !time.end) {
      return time.start;
    } else if (!time.start && time.end) {
      return time.end;
    } else {
      return "Add Time";
    }
  };

  return (
    <Container>
      <Button color={color} onClick={showOptions}>
        {renderButtonText()}
      </Button>
      {optionsVisible && (
        <Options
          ref={ref}
          id={id}
          date={date}
          time={time}
          setEventTime={setEventTime}
          color={color}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1 0 auto;
`;

const Button = styled.div`
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

export default Time;
