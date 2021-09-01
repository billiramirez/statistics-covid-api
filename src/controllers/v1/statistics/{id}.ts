import { Operation } from "express-openapi";
import { getStatisticByCountryName } from "../../../services";
export const parameters = [
  {
    in: "path",
    name: "id",
    required: true,
    type: "string",
  },
];

export const GET: Operation = [
  async (req: any, res: any, next: any) => {
    const countryId = req.params.id;
    try {
      const statisticDetail = await getStatisticByCountryName(countryId);
      if (!statisticDetail)
        res.status(404).json({ sucess: false, status: "RESOURCE_NOT_FOUND" });

      res.status(200).json({ success: true, statistics: statisticDetail });
    } catch (err) {
      res.status(500).json({ sucess: false, message: "INTERNAL_SERVER_ERROR" });
    }
  },
];

GET.apiDoc = {
  description: "Get a Record for Statistic Information.",
  operationId: "getStatisticsRecord",
  tags: ["statistics", "reading"],
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
