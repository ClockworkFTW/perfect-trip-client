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

const TripMap = (props) => {
  const { experiences, itinerary, lists, latitude, longitude, setCoordinates } =
    props;

  // Element references
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [searchCoordinates, setSearchCoordinates] = useState(null);

  // Markers
  const [experienceMarkers, setExperienceMarkers] = useState([]);
  const [itineraryMarkers, setItineraryMarkers] = useState([]);

  // Handle initialization
  useEffect(() => {
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [longitude, latitude],
      style: "mapbox://styles/mapbox/outdoors-v12",
      zoom: 14,
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
    const zoom = map.current.getZoom() > 14 ? map.current.getZoom() : 14;
    map.current.flyTo({ center: [lng, lat], zoom });
  }, [searchCoordinates]);

  // Create markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    experienceMarkers.forEach((marker) => {
      marker.remove();
    });
    itineraryMarkers.forEach((marker) => {
      marker.remove();
    });

    // Initialize new marker lists
    const newExperienceMarkers = [];
    const newItineraryMarkers = [];

    // Create experience markers
    experiences.forEach((experience) => {
      // Render a Marker Component on new DOM node
      const ref = createRef();
      ref.current = document.createElement("div");
      ReactDOM.createRoot(ref.current).render(
        <MarkerIcon color="green" experience={experience} />
      );

      // Create a Mapbox Marker at new DOM node
      const marker = new mapboxgl.Marker(ref.current);
      marker.setLngLat([experience.longitude, experience.latitude]);
      marker.addTo(map.current);
      newExperienceMarkers.push(marker);
    });

    // Create itinerary markers
    itinerary.forEach((event) => {
      // Render a Marker Component on new DOM node
      const ref = createRef();
      ref.current = document.createElement("div");

      // Get marker color
      let color = "green";
      if (event.date) {
        color = lists.find((list) => list.id === event.date).color;
      }

      ReactDOM.createRoot(ref.current).render(
        <MarkerIcon
          color={color}
          number={event.index + 1}
          experience={event.experience}
        />
      );

      // Create a Mapbox Marker at new DOM node
      const marker = new mapboxgl.Marker(ref.current);
      marker.setLngLat([event.experience.longitude, event.experience.latitude]);
      marker.addTo(map.current);
      newItineraryMarkers.push(marker);
    });

    // Update marker lists
    setExperienceMarkers(newExperienceMarkers);
    setItineraryMarkers(newItineraryMarkers);
  }, [experiences, itinerary]);

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
