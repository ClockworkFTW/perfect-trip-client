import styled from "styled-components";

import Flag from "../../Flag";

const SearchResults = ({ darkMode, places, selectPlace, error }) =>
  places.length ? (
    <Container darkMode={darkMode}>
      <List>
        {places.map((place) => {
          // Extract values
          const { id, title, city, country, country_code } = place;

          // Extract coordinates
          const lat = place.latitude;
          const lng = place.longitude;

          // Build name string
          const name = `${title}${city ? `, ${city}` : ""}${
            country ? `, ${country}` : ""
          }`;

          return (
            <Item key={id} onClick={() => selectPlace({ name, lat, lng })}>
              <Flag code={country_code} margin="0 8px 0 0" />
              {name}
            </Item>
          );
        })}
      </List>
    </Container>
  ) : null;

const Container = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  border-radius: 8px;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.neutral["400"] : theme.neutral["800"]};
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.neutral["800"] : theme.white};
`;

const List = styled.ul`
  overflow: hidden;
  margin: 0 14px;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  white-space: nowrap;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.green["500"]};
  }
`;

export default SearchResults;
