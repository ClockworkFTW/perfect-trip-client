import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// Config
import { MAPBOX_ACCESS_TOKEN } from "../../config";

// Components
import MarkerIcon from "./Marker/MarkerIcon";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const ViewMap = ({ latitude, longitude }) => {
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
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [longitude, latitude],
      zoom: 12,
    });

    // Initialize marker
    map.current.on("style.load", () => {
      markerContainer.current = document.createElement("div");
      ReactDOM.createRoot(markerContainer.current).render(<MarkerIcon />);
      marker.current = new mapboxgl.Marker(markerContainer.current)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });
  });

  return <Container ref={mapContainer} className="map-container" />;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export default ViewMap;
