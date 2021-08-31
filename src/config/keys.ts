import dotenv from "dotenv";
dotenv.config();

export const keys = {
  xRapidAPIHost: process.env.X_RAPID_API_HOST,
  XRapidAPIKey: process.env.X_RAPID_API_KEY,
  apiXRapidApiUrl: process.env.API_X_RAPID_API_URL,
};
