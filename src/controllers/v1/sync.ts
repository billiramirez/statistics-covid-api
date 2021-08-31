import { NextFunction } from "express";
import Statistics from "../../models/statistics";
import { fetchInitialData } from "../../services";

module.exports = {
  get: [
    async function (req: Request, res: any, next: NextFunction) {
      const [initialData, _deletedMany] = await Promise.all([
        fetchInitialData(),
        Statistics.deleteMany(),
      ]);

      const statistics = await Statistics.insertMany(initialData.response);
      res.status(200).json({
        message: `New ${statistics.length} records added successfuly to the Db`,
      });
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
