import styled from "styled-components";

import Search from "./Search";
import Filter from "./Filter";

const Menu = (props) => {
  const { pending, query, setQuery } = props;
  const { menuRef, menuHeight, keywords, setKeywords } = props;

  return (
    <Wrapper ref={menuRef}>
      <Container>
        <Search pending={pending} query={query} setQuery={setQuery} />
        <Filter
          menuHeight={menuHeight}
          activeKeywords={keywords}
          setActiveKeywords={setKeywords}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

export default Menu;
