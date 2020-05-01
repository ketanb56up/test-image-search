import axios from "axios";
import Constants from "./constants";

const API = axios.create({
  baseURL: Constants.FLICKR_API_URL,
});

export const fetchFromFlickrApi = async (url) => await API.get(url);
