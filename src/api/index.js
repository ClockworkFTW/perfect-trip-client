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
