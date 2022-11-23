import axios from "axios";

// Config
import { API_URL } from "../config";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export const register = async ({ credentials }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/auth/register`,
      method: "post",
      data: credentials,
    });

    return result.data.token;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async ({ credentials }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/auth/login`,
      method: "post",
      data: credentials,
    });

    return result.data.token;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getPlaces = async ({ query }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/places/?query=${query}`,
      method: "get",
    });

    return result.data.places;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const searchExperiences = async ({ keywords, coordinates }) => {
  try {
    const { center, northEast, southWest } = coordinates;

    const coordinatesQuery = `c_lat=${center.latitude}&c_lng=${center.longitude}&ne_lat=${northEast.latitude}&ne_lng=${northEast.longitude}&sw_lat=${southWest.latitude}&sw_lng=${southWest.longitude}`;
    const keywordsQuery = `keywords=${keywords.join()}`;

    const result = await axios({
      baseURL: API_URL,
      url: `/experience/search?${coordinatesQuery}&${keywordsQuery}`,
      method: "get",
    });

    return result.data.experiences;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getExperience = async ({ experienceId }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/experience/${experienceId}`,
      method: "get",
    });

    return result.data.experience;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createExperience = async ({ experience }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/experience/`,
      method: "post",
      data: experience,
      headers: getAuthHeader(),
    });

    return result.data.experience;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateExperience = async ({ experience }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/experience/${experience.id}`,
      method: "patch",
      data: experience,
      headers: getAuthHeader(),
    });

    return result.data.experience;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteExperience = async ({ experienceId }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/experience/${experienceId}`,
      method: "delete",
      headers: getAuthHeader(),
    });

    return result.data.experienceId;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getTrip = async ({ tripId }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/trip/${tripId}`,
      method: "get",
    });

    return result.data.trip;
  } catch (error) {
    throw error.response.data.message;
  }
};
