import styled from "styled-components";

import Flag from "../../Flag";

const SearchResults = ({ places, error, setCoordinates }) =>
  places.length ? (
    <Container>
      <List>
        {places.map((place) => (
          <Item key={place.id} onClick={() => setCoordinates(place.coords)}>
            <Flag code={place.country_code} margin="0 8px 0 0" />
            {place.name}
            {place.city && `, ${place.city}`}
            {place.country && `, ${place.country}`}
          </Item>
        ))}
      </List>
    </Container>
  ) : null;

const Container = styled.div`
  margin-top: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.neutral["800"]};
  box-shadow: ${({ theme }) => theme.shadow_lg};
`;

const List = styled.ul`
  overflow: hidden;
  margin: 12px 14px;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  white-space: nowrap;
  color: ${({ theme }) => theme.neutral["400"]};
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.green["500"]};
  }
`;

export default SearchResults;
