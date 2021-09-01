import { Operation } from "express-openapi";
import Statistics, { IStatistics } from "../../models/statistics";

export const GET: Operation = [
  async (req: any, res: any, next: any) => {
    try {
      const response = await Statistics.find();
      res.status(200).json({ success: true, statistics: response });
    } catch (err) {
      res.status(500).json({ success: false, status: "INTERNAL_SERVER_ERROR" });
    }
  },
];

export const POST: Operation = [
  async (req: any, res: any, next: any) => {
    const statistic: IStatistics = req.body;
    try {
      const newStatistic = new Statistics(statistic);
      const newDoc = await newStatistic.save();

      res.status(500).json({ success: true, statistic: newDoc });
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
  },
};

POST.apiDoc = {
  description: "Create new entry to Statistics for Covid-19",
  operationId: "getStatistics",
  tags: ["statistics", "reading"],
  parameters: [
    {
      in: "body",
      name: "statistics",
      description: "The entire object for a New Statistic Entry",
      required: true,
      schema: {
        $ref: "#/definitions/Statistics",
      },
    },
  ],
  responses: {
    default: {
      description: "Unexpected error",
      schema: {
        $ref: "#/definitions/Error",
      },
    },
  },
};
