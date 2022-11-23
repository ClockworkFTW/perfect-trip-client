import styled from "styled-components";

import Icon from "../../Icon";

const SearchBar = ({ darkMode, queryRef, loading, onChange, resetSearch }) => (
  <Container darkMode={darkMode}>
    <Icon icon="magnifying-glass" color="neutral" shade={400} />
    <Input
      darkMode={darkMode}
      ref={queryRef}
      type="text"
      placeholder="Search places..."
      onChange={onChange}
    />
    {loading ? (
      <Icon icon="spinner" color="neutral" shade={400} />
    ) : (
      <Button onClick={resetSearch}>
        <Icon icon="times" color="neutral" shade={400} />
      </Button>
    )}
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.neutral["800"] : theme.white};
`;

const Input = styled.input`
  width: 100%;
  margin: 0px 8px;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.white : theme.neutral["800"]};
  ::placeholder {
    color: ${({ theme }) => theme.neutral["400"]};
  }
`;

const Button = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default SearchBar;
