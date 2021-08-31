import axios from "axios";
import { keys } from "../config/keys";

const fetchInitialData = async () => {
  try {
    const response = await axios.get(`${keys.apiXRapidApiUrl}/statistics`, {
      headers: {
        "x-rapidapi-host": keys.xRapidAPIHost,
        "x-rapidapi-key": keys.XRapidAPIKey,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export { fetchInitialData };
