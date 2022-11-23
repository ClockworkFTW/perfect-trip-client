import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";

// API
import * as API from "../../../api";

// Components
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = ({ darkMode = false, width = "100%", setCoordinates }) => {
  const queryRef = useRef();

  // Places state
  const [places, setPlaces] = useState([]);

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get places
  const changeHandler = async (event) => {
    try {
      setLoading(true);
      const result = await API.getPlaces({ query: event.target.value });
      setPlaces(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce change handler by 500ms
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500),
    []
  );

  // Clean up debounce change handler
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  // Handle place selection
  const selectPlace = ({ name, lat, lng }) => {
    setCoordinates({ lat, lng });
    queryRef.current.value = name;
    setPlaces([]);
  };

  // Handle searchbar reset
  const resetSearch = () => {
    queryRef.current.value = "";
    setPlaces([]);
  };

  return (
    <Container width={width}>
      <SearchBar
        darkMode={darkMode}
        queryRef={queryRef}
        loading={loading}
        onChange={debouncedChangeHandler}
        resetSearch={resetSearch}
      />
      <SearchResults
        darkMode={darkMode}
        places={places}
        selectPlace={selectPlace}
        error={error}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: ${({ width }) => width};
`;

export default Search;
