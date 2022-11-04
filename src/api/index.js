import axios from "axios";

const prodURL = "https://perfect-trip.herokuapp.com";
const devURL = "https://jnb-api.ngrok.io";

// const baseURL = process.env.NODE_ENV === "production" ? prodURL : devURL;
const baseURL = prodURL;

export const register = async ({ credentials }) => {
  try {
    const result = await axios({
      baseURL,
      url: `/auth/register`,
      method: "post",
      data: credentials,
    });

    if (result.status === 200) {
      return result.data;
    }
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

    if (result.status === 200) {
      return result.data;
    }
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

    if (result.status === 200) {
      return result.data;
    }
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

    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    throw error.response.data;
  }
};
