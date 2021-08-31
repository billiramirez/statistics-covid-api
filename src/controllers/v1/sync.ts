import { NextFunction } from "express";
import { fetchInitialData } from "../../services";

module.exports = {
  get: [
    async function (req: Request, res: any, next: NextFunction) {
      const data = await fetchInitialData();
      res.status(200).json({ data: data });
    },
  ],

  post: function (req: Request, res: any, next: NextFunction) {
    res.status(500).json({});
  },
};

module.exports.post.apiDoc = {
  description: "Sync Initial Data",
  operationId: "syncInitialData",
  tags: ["sync", "statistics"],
  parameters: [],
  responses: {
    default: {
      description: "Unexpected error",
      schema: {
        $ref: "#/definitions/Error",
      },
    },
  },
};
