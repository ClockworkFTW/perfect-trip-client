import styled from "styled-components";

import Icon from "../../Icon";

const Search = ({ pending, query, setQuery }) => (
  <Container>
    {pending ? (
      <Icon icon="spinner" color="neutral" shade={400} />
    ) : (
      <Icon icon="magnifying-glass" color="neutral" shade={400} />
    )}
    <Input
      type="text"
      placeholder="Search experiences..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </Container>
);

const Container = styled.div`
  width: 100%;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

const Input = styled.input`
  width: 100%;
  margin: 0px 8px;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.neutral["700"]};
  ::placeholder {
    color: ${({ theme }) => theme.neutral["400"]};
  }
`;

export default Search;
