import dotenv from "dotenv";
dotenv.config();

export const keys = {
  xRapidAPIHost: process.env.X_RAPID_API_HOST,
  XRapidAPIKey: process.env.X_RAPID_API_KEY,
  apiXRapidApiUrl: process.env.API_X_RAPID_API_URL,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  authToken: process.env.AUTH_TOKEN,
};
