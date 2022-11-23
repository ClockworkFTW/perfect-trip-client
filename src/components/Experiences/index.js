import { useState } from "react";
import { useMeasure } from "react-use";
import styled from "styled-components";

import Menu from "./Menu";
import Experience from "./Experience";

const Experiences = (props) => {
  const { loading, experiences, addEvent, keywords, setKeywords } = props;

  // Calculate menu height
  const [menuRef, { height: menuHeight }] = useMeasure();

  // Search bar query
  const [query, setQuery] = useState("");

  return (
    <Wrapper>
      <Menu
        loading={loading}
        query={query}
        setQuery={setQuery}
        menuRef={menuRef}
        menuHeight={menuHeight}
        keywords={keywords}
        setKeywords={setKeywords}
      />
      <Container menuHeight={menuHeight}>
        {loading && experiences.length === 0 ? (
          <Loader>Loading...</Loader>
        ) : (
          experiences
            .filter((experience) =>
              experience.title.toLowerCase().includes(query)
            )
            .map((experience) => (
              <Experience
                key={experience.id}
                experience={experience}
                addEvent={addEvent}
              />
            ))
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Container = styled.div`
  position: absolute;
  top: ${({ menuHeight }) => `${menuHeight}px`};
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.neutral["700"]};
`;

export default Experiences;
