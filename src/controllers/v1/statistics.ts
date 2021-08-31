import { Operation } from "express-openapi";
import Statistics from "../../models/statistics";

export const GET: Operation = [
  async (req: any, res: any, next: any) => {
    const response = await Statistics.find();
    res.status(200).json({ success: true, statistics: response });
  },
];

export const POST: Operation = [
  (req: any, res: any, next: any) => {
    res.status(500).json({});
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
