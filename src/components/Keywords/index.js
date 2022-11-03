import { useState } from "react";
import styled from "styled-components";

import { keywords } from "../../config";

import Input from "../Input";
import Keyword from "./Keyword";

const Keywords = ({ activeKeywords, setActiveKeywords }) => {
  const [query, setQuery] = useState("");

  const filteredKeywords =
    query === ""
      ? Object.entries(keywords).filter(([key]) => activeKeywords.includes(key))
      : Object.entries(keywords).filter(
          ([key]) => key.includes(query) || activeKeywords.includes(key)
        );

  const toggleKeyword = (key) => {
    if (activeKeywords.includes(key)) {
      setActiveKeywords(activeKeywords.filter((keyword) => keyword !== key));
    } else {
      setActiveKeywords([...activeKeywords, key]);
      setQuery("");
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search keywords..."
        value={query}
        onChange={setQuery}
      />
      <Wrapper>
        {filteredKeywords.map(([key, { text, icon }]) => (
          <Container key={key} onClick={() => toggleKeyword(key)}>
            <Keyword
              text={text}
              icon={icon}
              isActive={activeKeywords.includes(key)}
            />
          </Container>
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 14px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Container = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default Keywords;
