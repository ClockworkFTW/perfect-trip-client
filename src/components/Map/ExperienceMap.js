import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// Config
import { MAPBOX_ACCESS_TOKEN } from "../../config";

// Components
import Search from "./Search";
import MarkerIcon from "./Marker/MarkerIcon";
import MarkerLocation from "./Marker/MarkerLocation";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const ExperienceMap = ({ latitude, longitude, setCoordinates }) => {
  // Element references
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerContainer = useRef(null);
  const marker = useRef(null);

  // Handle initialization
  useEffect(() => {
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      projection: "globe",
      center: [longitude, latitude],
      zoom: 12,
    });

    // Initialize fog and marker
    map.current.on("style.load", () => {
      map.current.setFog({});
      markerContainer.current = document.createElement("div");
      ReactDOM.createRoot(markerContainer.current).render(<MarkerIcon />);
      marker.current = new mapboxgl.Marker(markerContainer.current)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });
  });

  // Handle map click
  useEffect(() => {
    if (!map.current) return;

    // Update coordinates
    map.current.on("click", (e) => {
      const lat = e.lngLat.lat.toFixed(4);
      const lng = e.lngLat.lng.toFixed(4);
      setCoordinates({ lat, lng });
    });
  });

  // Handle coordinates update
  useEffect(() => {
    if (!map.current || !marker.current) return;

    // Update marker coords
    marker.current.setLngLat([longitude, latitude]);

    // Fly to coords
    let zoom = map.current.getZoom();
    zoom = zoom > 12 ? zoom : 12;
    map.current.flyTo({ center: [longitude, latitude], zoom });
  }, [latitude, longitude]);

  return (
    <Wrapper>
      <Container ref={mapContainer} className="map-container" />
      <Search setCoordinates={setCoordinates} />
      <MarkerLocation latitude={latitude} longitude={longitude} />
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

export default ExperienceMap;
