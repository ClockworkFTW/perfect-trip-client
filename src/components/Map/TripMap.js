import { createRef, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// Config
import { MAPBOX_ACCESS_TOKEN } from "../../config";

// Components
import Search from "./Search";
import MarkerIcon from "./Marker/MarkerIcon";

// Utilities
import { roundCoords } from "../../util";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const TripMap = ({ experiences, latitude, longitude, setCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Handle initialization
  useEffect(() => {
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [longitude, latitude],
      style: "mapbox://styles/mapbox/streets-v11",
      projection: "globe",
      zoom: 12,
    });

    // Initialize fog
    map.current.on("style.load", () => {
      map.current.setFog({});
    });

    // Initialize coordinates
    const center = { latitude, longitude };
    const bounds = map.current.getBounds();
    const northEast = roundCoords(bounds._ne);
    const southWest = roundCoords(bounds._sw);
    setCoordinates({ center, northEast, southWest });
  });

  // Handle map move
  useEffect(() => {
    if (!map.current) return;

    const eventType = "moveend";

    // Update coordinates
    const eventListener = () => {
      const center = roundCoords(map.current.getCenter());

      if (center.latitude !== latitude && center.longitude !== longitude) {
        const bounds = map.current.getBounds();
        const northEast = roundCoords(bounds._ne);
        const southWest = roundCoords(bounds._sw);
        setCoordinates({ center, northEast, southWest });
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
    if (!map.current || !searchCoordinates) return;

    // Get bounding box and update coordinates
    const { lat, lng } = searchCoordinates;

    // TODO: Extrapolate bounds
    const bounds = map.current.getBounds();
    const northEast = roundCoords(bounds._ne);
    const southWest = roundCoords(bounds._sw);

    setCoordinates({
      center: { latitude: lat, longitude: lng },
      northEast,
      southWest,
    });

    // Update map zoom and fly to center
    const zoom = map.current.getZoom() > 12 ? map.current.getZoom() : 12;
    map.current.flyTo({ center: [lng, lat], zoom });
  }, [searchCoordinates]);

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
      marker.setLngLat([experience.longitude, experience.latitude]);
      marker.addTo(map.current);
      newMarkers.push(marker);
    });

    // Update marker list
    setMarkers(newMarkers);
  }, [experiences]);

  return (
    <Wrapper>
      <Container ref={mapContainer} className="map-container" />
      <Banner>
        <Search
          darkMode={true}
          width="400px"
          setCoordinates={setSearchCoordinates}
        />
      </Banner>
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

const Banner = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: space-between;
`;

export default TripMap;
