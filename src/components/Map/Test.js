import { createRef, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import Search from "./Search";
import MarkerIcon from "./MarkerIcon";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const roundCoords = ({ lat, lng }) => ({
  lat: lat.toFixed(4),
  lng: lng.toFixed(4),
});

const Map = ({ coords, setCoords, experiences }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [searchCoords, setSearchCoords] = useState(coords.center);
  const [markers, setMarkers] = useState([]);

  // Handle initialization
  useEffect(() => {
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [coords.center.lng, coords.center.lat],
      style: "mapbox://styles/mapbox/streets-v11",
      projection: "globe",
      zoom: 12,
    });

    // Initialize fog
    map.current.on("style.load", () => {
      map.current.setFog({});
    });
  });

  // Handle map move
  useEffect(() => {
    if (!map.current) return;

    const eventType = "moveend";

    // Update coordinates
    const eventListener = () => {
      const center = roundCoords(map.current.getCenter());

      if (JSON.stringify(center) !== JSON.stringify(coords.center)) {
        const bounds = map.current.getBounds();
        const northEast = roundCoords(bounds._ne);
        const southWest = roundCoords(bounds._sw);
        setCoords({ center, northEast, southWest });
      }
    };

    // Register event
    map.current.on(eventType, eventListener);

    // Cleanup event
    return () => {
      map.current.off(eventType, eventListener);
    };
  });

  // Handle search coordinates update
  useEffect(() => {
    if (!map.current) return;

    // Get bounding box and update coordinates
    const center = roundCoords(searchCoords);
    const bounds = map.current.getBounds();
    const northEast = roundCoords(bounds._ne);
    const southWest = roundCoords(bounds._sw);
    setCoords({ center, northEast, southWest });

    // Update map zoom and fly to center
    const zoom = map.current.getZoom() > 12 ? map.current.getZoom() : 12;
    map.current.flyTo({ center: [center.lng, center.lat], zoom });
  }, [searchCoords]);

  // Create markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markers.forEach((marker) => {
      marker.remove();
    });

    // Initialize new marker list
    const newMarkers = [];

    // Render custom marker components
    experiences.forEach((experience) => {
      // Render a Marker Component on new DOM node
      const ref = createRef();
      ref.current = document.createElement("div");
      ReactDOM.createRoot(ref.current).render(
        <MarkerIcon experience={experience} />
      );

      // Create a Mapbox Marker at new DOM node
      const marker = new mapboxgl.Marker(ref.current);
      marker.setLngLat([experience.coords.lng, experience.coords.lat]);
      marker.addTo(map.current);
      newMarkers.push(marker);
    });

    // Update marker list
    setMarkers(newMarkers);
  }, [experiences]);

  return (
    <Wrapper>
      <Container ref={mapContainer} className="map-container" />
      <Search setCoords={setSearchCoords} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
