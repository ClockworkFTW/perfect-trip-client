import { useState } from "react";
import styled from "styled-components";

import { keywords } from "../../../config";

import Icon from "../../Icon";
import Keyword from "../../Keywords/Keyword";

const Filter = ({ menuHeight, activeKeywords, setActiveKeywords }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const onKeywordClicked = (key) => {
    if (activeKeywords.includes(key)) {
      setActiveKeywords(activeKeywords.filter((keyword) => keyword !== key));
    } else {
      setActiveKeywords([...activeKeywords, key]);
    }
  };

  return (
    <>
      <Button onClick={toggleFilter}>
        <Icon icon="sliders-up" />
      </Button>
      {isOpen && (
        <List menuHeight={menuHeight}>
          {Object.entries(keywords).map(([key, { text, icon }]) => (
            <Item key={key} onClick={() => onKeywordClicked(key)}>
              <Keyword
                text={text}
                icon={icon}
                isActive={activeKeywords.includes(key)}
              />
            </Item>
          ))}
        </List>
      )}
    </>
  );
};

const Button = styled.button`
  padding: 0 14px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.neutral["700"]};
  background-color: ${({ theme }) => theme.white};
  :hover {
    cursor: pointer;
  }
`;

const List = styled.div`
  z-index: 1;
  position: absolute;
  top: ${({ menuHeight }) => `${menuHeight}px`};
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  background-color: ${({ theme }) => theme.neutral["100"]};
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
  overflow-y: scroll;
`;

const Item = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default Filter;
