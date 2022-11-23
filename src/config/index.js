import { keywords } from "./keywords";

export const ENV = process.env.REACT_APP_ENV;

const PROD_URL = "https://perfect-trip.herokuapp.com";
const DEV_URL = "http://127.0.0.1:5000";

export const API_URL = ENV === "production" ? PROD_URL : DEV_URL;

export const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const KEYWORDS = keywords;
