import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

// API
import * as API from "../api";

// Components
import Field from "../components/Field";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Keywords from "../components/Keywords";
import Images from "../components/Images";
import Button from "../components/Button";
import Error from "../components/Error";
import ExperienceMap from "../components/Map/ExperienceMap";

// Reducer
const experienceReducer = (state, action) => {
  switch (action.type) {
    case "INIT_EXPERIENCE": {
      return action.payload;
    }
    case "SET_TITLE": {
      return { ...state, title: action.payload };
    }
    case "SET_DESCRIPTION": {
      return { ...state, description: action.payload };
    }
    case "SET_COORDINATES": {
      const { lat, lng } = action.payload;
      return { ...state, latitude: lat, longitude: lng };
    }
    case "ADD_KEYWORD": {
      const keywords = [...state.keywords, action.payload];
      return { ...state, keywords };
    }
    case "REMOVE_KEYWORD": {
      const keywords = state.keywords.filter(
        (keyword) => keyword !== action.payload
      );
      return { ...state, keywords };
    }
    case "ADD_IMAGES": {
      const images = [...state.images, ...action.payload];
      return { ...state, images };
    }
    case "REMOVE_IMAGE": {
      const images = state.images.filter((image) => image !== action.payload);
      return { ...state, images };
    }
    default: {
      return state;
    }
  }
};

const ExperienceEditor = () => {
  // Router hooks
  const { experienceId } = useParams();
  const navigate = useNavigate();

  // API loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Experience state
  const [experience, dispatch] = useReducer(experienceReducer, {
    title: "",
    description: "",
    latitude: 37.7749,
    longitude: -122.4194,
    keywords: [],
    images: [],
  });

  // Action Creators
  const setTitle = (title) => {
    dispatch({ type: "SET_TITLE", payload: title });
  };
  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };
  const setCoordinates = (coordinates) => {
    dispatch({ type: "SET_COORDINATES", payload: coordinates });
  };
  const addKeyword = (keyword) => {
    dispatch({ type: "ADD_KEYWORD", payload: keyword });
  };
  const removeKeyword = (keyword) => {
    dispatch({ type: "REMOVE_KEYWORD", payload: keyword });
  };
  const addImages = (images) => {
    dispatch({ type: "ADD_IMAGES", payload: images });
  };
  const removeImage = (images) => {
    dispatch({ type: "REMOVE_IMAGE", payload: images });
  };

  // Initialize experience on page load
  useEffect(() => {
    const initExperience = async () => {
      try {
        setLoading(true);
        const result = await API.getExperience({ experienceId });
        dispatch({ type: "INIT_EXPERIENCE", payload: result });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (experienceId !== "new") {
      initExperience();
    }
  }, [experienceId]);

  // Handle experience creation and updates
  const onSaveClicked = async () => {
    if (experienceId !== "new") {
      try {
        setLoading(true);
        const result = await API.updateExperience({ experience });
        navigate(`/experience/${result.id}`, { state: { experience: result } });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const result = await API.createExperience({ experience });
        navigate(`/experience/${result.id}`, { state: { experience: result } });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle experience deletion
  const onDeleteClicked = async () => {
    try {
      setLoading(true);
      await API.deleteExperience({ experienceId });
      navigate(`/`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Sidebar>
        {error && <Error error={error} />}
        <Field id="title" isValid={experience.title.length}>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            value={experience.title}
            onChange={setTitle}
          />
        </Field>
        <Field id="description" isValid={experience.description.length}>
          <TextArea
            id="description"
            type="text"
            placeholder="Description"
            value={experience.description}
            onChange={setDescription}
          />
        </Field>
        <Field id="keywords" isValid={experience.keywords.length}>
          <Keywords
            keywords={experience.keywords}
            addKeyword={addKeyword}
            removeKeyword={removeKeyword}
          />
        </Field>
        <Field id="images" isValid={experience.images.length}>
          <Images
            images={experience.images}
            addImages={addImages}
            removeImage={removeImage}
          />
        </Field>
        <Button width="100%" onClick={onSaveClicked}>
          {loading ? "Loading..." : "Save"}
        </Button>
        {experienceId !== "new" && (
          <Button width="100%" onClick={onDeleteClicked}>
            {loading ? "Loading..." : "Delete"}
          </Button>
        )}
      </Sidebar>
      <Main>
        <ExperienceMap
          latitude={experience.latitude}
          longitude={experience.longitude}
          setCoordinates={setCoordinates}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 600px 1fr;
`;

const Sidebar = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.neutral["100"]};
`;

const Main = styled.div`
  position: relative;
`;

export default ExperienceEditor;
