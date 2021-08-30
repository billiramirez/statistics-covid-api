import { NextFunction } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import statusCodes from "./utils/statusCodes";

const app = require("express")();
const bodyParser = require("body-parser");
// normally you'd just do require('express-openapi'), but this is for test purposes.
const openapi = require("express-openapi");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

openapi.initialize({
  apiDoc: require("./api-routes"),
  app: app,
  validateApiDoc: true,
  docsPath: "/openapi.json",
  paths: path.resolve(__dirname, "controllers/v1"),
  errorMiddleware(err: any, req: Request, res: any, next: NextFunction) {
    // logger.error(err, "error-handler");
    console.log("err:   ", err);
    if (
      !err.status ||
      err.status === statusCodes.HTTP_500_INTERNAL_SERVER_ERROR
    ) {
      return res
        .status(statusCodes.HTTP_500_INTERNAL_SERVER_ERROR)
        .json({ error: { message: "INTERNAL_SERVER_ERROR" } });
    }

    /**
     * Customize api errors response on 400 - BAD Request
     * When open api throws fields validations
     */
    if (err.status === statusCodes.HTTP_400_BAD_REQUEST && err.errors) {
      const fieldsWithErrors = err.errors.map((error: any) => error.path);
      return res.status(err.status).json({
        error: {
          errors: err.errors,
          message: `Your request is missing or has invalid parameters in field(s) ${fieldsWithErrors.join(
            ","
          )}. Please verify and resubmit.`,
        },
      });
    }
    return res.status(err.status).json({
      error: { errors: err.errors, message: JSON.stringify(err) },
    });
  },
});

app.use(function (err: any, req: Request, res: any, next: NextFunction) {
  res.status(err.status).json(err);
});

export { app };
