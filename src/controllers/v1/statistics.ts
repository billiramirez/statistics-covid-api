import { Operation } from "express-openapi";

import { getAllStatistics } from "../../services";

export const GET: Operation = [
  async (req: any, res: any, next: any) => {
    try {
      const response = await getAllStatistics();
      res.status(200).json({ success: true, statistics: response });
    } catch (err) {
      res.status(500).json({ success: false, status: "INTERNAL_SERVER_ERROR" });
    }
  },
];

GET.apiDoc = {
  description: "Get the Statistic Information.",
  operationId: "getStatistics",
  tags: ["statistics", "reading"],
  parameters: [],
  responses: {
    default: {
      description: "Unexpected error",
      schema: {
        $ref: "#/definitions/Error",
      },
    },
    200: {
      description: "The list of existing studies",
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          statistics: {
            type: "object",
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
};
