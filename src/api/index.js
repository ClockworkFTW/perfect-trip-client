import axios from "axios";

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

export const updateUsername = async ({ data }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/user/update/user`,
      method: "post",
      data: data,
      headers: getAuthHeader(),
    });

    return result.data.token;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateAvatar = async ({ data }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/user/update/avatar`,
      method: "post",
      data: data,
      headers: getAuthHeader(),
    });

    return result.data.token;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updatePassword = async ({ passwords }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/user/update/pass`,
      method: "post",
      data: passwords,
      headers: getAuthHeader(),
    });

    return result.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteAccount = async ({ deletePass }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/user/delete`,
      method: "post",
      data: deletePass,
      headers: getAuthHeader(),
    });

    return result.data.message;
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

export const getExperiences = async () => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/experience/`,
      method: "get",
      headers: getAuthHeader(),
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
      url: `/experience/delete`,
      method: "delete",
      headers: getAuthHeader(),
    });

    return result.data.experienceId;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createReview = async ({ data }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/review/`,
      method: "post",
      data: data,
      headers: getAuthHeader(),
    });

    return result.data.experience;
  } catch (error) {
    throw error.response.message.data;
  }
};

export const getTrips = async () => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/trip/`,
      method: "get",
      headers: getAuthHeader(),
    });

    return result.data.trips;
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
      headers: getAuthHeader(),
    });

    return result.data.trip;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createTrip = async ({ trip }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/trip/`,
      method: "post",
      data: trip,
      headers: getAuthHeader(),
    });

    return result.data.trip;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateTrip = async ({ trip }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/trip/${trip.id}`,
      method: "patch",
      data: trip,
      headers: getAuthHeader(),
    });

    return result.data.trip;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteTrip = async ({ tripId }) => {
  try {
    const result = await axios({
      baseURL: API_URL,
      url: `/trip/${tripId}`,
      method: "delete",
      headers: getAuthHeader(),
    });

    return result.data.tripId;
  } catch (error) {
    throw error.response.data.message;
  }
};
