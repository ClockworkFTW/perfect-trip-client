import axios from "axios";

export const getPlaces = async (query) => {
  try {
    const result = await axios({
      method: "get",
      baseURL: "https://jnb-api.ngrok.io",
      url: `/places/?query=${query}`,
    });

    if (result.status === 200) {
      return result.data;
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const getExperiences = async ({ coords, keywords }) => {
  try {
    const { center, northEast, southWest } = coords;

    if (!northEast || !southWest) {
      return [];
    }

    const coordsQuery = `c_lat=${center.lat}&c_lng=${center.lng}&ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`;
    const keywordsQuery = `keywords=${keywords.join()}`;

    const result = await axios({
      method: "get",
      baseURL: "https://jnb-api.ngrok.io",
      url: `/experience/search?${coordsQuery}&${keywordsQuery}`,
    });

    if (result.status === 200) {
      return result.data;
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
