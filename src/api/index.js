import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "https://jnb-api.ngrok.io"
    : "https://perfect-trip.herokuapp.com";

export const getPlaces = async (query) => {
  try {
    const result = await axios({
      method: "get",
      url: `/places/?query=${query}`,
      baseURL,
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
      return { experiences: [] };
    }

    const coordsQuery = `c_lat=${center.lat}&c_lng=${center.lng}&ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`;
    const keywordsQuery = `keywords=${keywords.join()}`;

    const result = await axios({
      method: "get",
      url: `/experience/search?${coordsQuery}&${keywordsQuery}`,
      baseURL,
    });

    if (result.status === 200) {
      return result.data;
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
