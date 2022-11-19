import axios from "axios";

const prodURL = "https://perfect-trip.herokuapp.com";
const devURL = "http://127.0.0.1:5000";

// const baseURL = process.env.NODE_ENV === "production" ? prodURL : devURL;
const baseURL = devURL;

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
      baseURL,
      url: `/auth/register`,
      method: "post",
      data: credentials,
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const login = async ({ credentials }) => {
  try {
    const result = await axios({
      baseURL,
      url: `/auth/login`,
      method: "post",
      data: credentials,
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUsername = async ({ avatar }) => {
  try {
    const result = await axios({
      baseURL,
      url: `/user/update/user`,
      method: "post",
      data: avatar,
      headers: getAuthHeader(),
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updatePassword = async ({ credentials }) => {
  try {
    const result = await axios({
      baseURL,
      url: `/user/update/pass`,
      method: "post",
      data: credentials,
      headers: getAuthHeader(),
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPlaces = async (query) => {
  try {
    const result = await axios({
      baseURL,
      url: `/places/?query=${query}`,
      method: "get",
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getExperiences = async ({ coords, keywords }) => {
  try {
    const { center, northEast, southWest } = coords;

    if (!northEast || !southWest) {
      return { experiences: [] };
    }

    const coordsQuery = `c_lat=${center.lat}&c_lng=${center.lng}&ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`;
    const keywordsQuery = `keywords=${keywords.join()}`;

    const result = await axios({
      baseURL,
      url: `/experience/search?${coordsQuery}&${keywordsQuery}`,
      method: "get",
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createExperience = async ({ experience }) => {
  try {
    const result = await axios({
      baseURL,
      url: `/experience/`,
      method: "post",
      data: experience,
      headers: getAuthHeader(),
    });

    return result.data;
  } catch (error) {
    throw error.response.data;
  }
};
