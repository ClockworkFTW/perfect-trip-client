import { keywords } from "./keywords";

export const KEYWORDS = keywords;
export const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const API_URL =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://perfect-trip.herokuapp.com"
    : "http://127.0.0.1:5000";
