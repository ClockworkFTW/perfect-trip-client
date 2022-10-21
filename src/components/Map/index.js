import { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import MarkerIcon from "./MarkerIcon";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ coords, setCoords }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerContainer = useRef(null);
  const marker = useRef(null);

  // Handle initialization
  useEffect(() => {
    if (map.current) return;

    const { lat, lng } = coords;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      projection: "globe",
      center: [lng, lat],
      zoom: 12,
    });

    // Initialize fog and marker
    map.current.on("style.load", () => {
      map.current.setFog({});
      markerContainer.current = document.createElement("div");
      ReactDOM.createRoot(markerContainer.current).render(<MarkerIcon />);
      marker.current = new mapboxgl.Marker(markerContainer.current)
        .setLngLat([coords.lng, coords.lat])
        .addTo(map.current);
    });
  });

  // Handle map move
  useEffect(() => {
    if (!map.current) return;

    map.current.on("moveend", () => {
      // TODO: Get experiences within bounding box
    });
  });

  // Handle map click
  useEffect(() => {
    if (!map.current) return;

    // Update coords
    map.current.on("click", (e) => {
      const lat = e.lngLat.lat.toFixed(4);
      const lng = e.lngLat.lng.toFixed(4);
      setCoords({ lat, lng });
    });
  });

  // Handle coordinates update
  useEffect(() => {
    if (!map.current || !marker.current) return;

    // Update marker coords
    const { lat, lng } = coords;
    marker.current.setLngLat([lng, lat]);

    // Fly to coords
    let zoom = map.current.getZoom();
    zoom = zoom > 12 ? zoom : 12;
    map.current.flyTo({ center: [lng, lat], zoom });
  }, [coords]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100%" }}
      className="map-container"
    />
  );
};

export default Map;
