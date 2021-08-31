import { Operation } from "express-openapi";
import Statistics from "../../models/statistics";
import { fetchInitialData } from "../../services";

export const GET: Operation = [
  async (req, res, next) => {
    const [initialData, _deletedMany] = await Promise.all([
      fetchInitialData(),
      Statistics.deleteMany(),
    ]);

    const statistics = await Statistics.insertMany(initialData.response);
    res.status(200).json({
      message: `New ${statistics.length} records added successfuly to the Db`,
    });
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
    },
  },
};
