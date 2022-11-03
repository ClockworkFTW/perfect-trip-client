import { useEffect, useState, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";

import * as API from "../../../api";
import useApi from "../../../api/useApi";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Search = ({ setCoords }) => {
  const queryRef = useRef();

  const [query, setQuery] = useState("");

  const { data, pending, error } = useApi(API.getPlaces, { places: [] }, query);

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const resetQuery = () => {
    setQuery("");
    queryRef.current.value = "";
  };

  return (
    <Container>
      <SearchBar
        pending={pending}
        queryRef={queryRef}
        resetQuery={resetQuery}
        onChange={debouncedChangeHandler}
      />
      <SearchResults
        error={error}
        query={query}
        results={data.places}
        setCoords={setCoords}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  width: 400px;
`;

export default Search;
