import { useState } from "react";
import styled from "styled-components";

// Config
import { KEYWORDS } from "../../config";

// Components
import Input from "../Input";
import Keyword from "./Keyword";

const Keywords = ({ keywords, addKeyword, removeKeyword }) => {
  const [query, setQuery] = useState("");

  const filterKeywords = () => {
    if (query === "") {
      return Object.entries(KEYWORDS).filter(([keyword]) =>
        keywords.includes(keyword)
      );
    } else {
      return Object.entries(KEYWORDS).filter(
        ([keyword]) => keyword.includes(query) || keywords.includes(keyword)
      );
    }
  };

  const toggleKeyword = (keyword) => {
    if (keywords.includes(keyword)) {
      removeKeyword(keyword);
    } else {
      addKeyword(keyword);
    }
  };

  return (
    <>
      <Input
        id="keywords"
        type="text"
        placeholder="Search keywords..."
        value={query}
        onChange={setQuery}
      />
      <Wrapper>
        {filterKeywords().map(([keyword, { text, icon }]) => (
          <Container key={keyword} onClick={() => toggleKeyword(keyword)}>
            <Keyword
              text={text}
              icon={icon}
              isActive={keywords.includes(keyword)}
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
