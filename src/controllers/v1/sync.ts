import { Operation } from "express-openapi";
import protectedRoute from "../../middlewares/protectedRoutes";
import Statistics from "../../models/statistics";
import { fetchInitialData } from "../../services";

export const GET: Operation = [
  protectedRoute,
  async (req, res, next) => {
    try {
      const [initialData, _deletedMany] = await Promise.all([
        fetchInitialData(),
        Statistics.deleteMany(),
      ]);

      const statistics = await Statistics.insertMany(initialData.response);
      res.status(200).json({
        message: `New ${statistics.length} records added successfuly to the Db`,
      });
    } catch (err) {
      res.status(500).json({ success: false, status: "INTERNAL_SERVER_ERROR" });
    }
  },
];

GET.apiDoc = {
  description: "Sync Initial Data",
  operationId: "syncInitialData",
  tags: ["sync"],
  parameters: [],
  responses: {
    default: {
      description: "Unexpected error",
      schema: {
        $ref: "#/definitions/Error",
      },
    },
    200: {
      description: "Successful Sync Operation",
      schema: {
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
    401: {
      description: "Unauthorized Operation",
      schema: {
        properties: {
          success: { type: "boolean" },
          error: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      schema: {
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
        },
      },
    },
  },
  security: [{ Bearer: [] }],
};
