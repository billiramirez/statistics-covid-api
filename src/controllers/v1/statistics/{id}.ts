import { Operation } from "express-openapi";
import protectedRoute from "../../../middlewares/protectedRoutes";
import StatisticModel from "../../../models/statistics";
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
  protectedRoute,
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

export const POST: Operation = [
  protectedRoute,
  async (req: any, res: any, next: any) => {
    const countryId = req.params.id;
    try {
      const { cases, deaths, tests } = req.body;

      let statisticDocFound = await getStatisticByCountryName(countryId);

      if (!statisticDocFound)
        return res
          .status(404)
          .json({ sucess: false, status: "RESOURCE_NOT_FOUND" });

      let statistictDocUpdated = await StatisticModel.updateOne(
        {
          country: countryId,
        },
        {
          cases: {
            new: statisticDocFound.cases.new + cases.new,
            active: statisticDocFound.cases.active + cases.active,
            recovered: statisticDocFound.cases.recovered + cases.recovered,
            critical: statisticDocFound.cases.critical + cases.critical,
            total:
              statisticDocFound.cases.total +
              Object.keys(cases).reduce((acc: any, val: any) => {
                acc += cases[val];
                return acc;
              }, 0),
          },
          deaths: {
            new: statisticDocFound.deaths.new + deaths,
            total: statisticDocFound.deaths.total + deaths,
          },
          tests: {
            total: statisticDocFound.tests.total + tests,
          },
        },
      );

      if (!statistictDocUpdated)
        return res
          .status(404)
          .json({ sucess: false, status: "RESOURCE_NOT_FOUND" });

      let statisticUpdated = await getStatisticByCountryName(countryId);

      res.status(200).json({ success: true, statistics: statisticUpdated });
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
    200: {
      description: "Statistic Fetched  Succesfully",
      schema: {
        properties: {
          success: { type: "boolean" },
          statistics: {
            type: "object",
            properties: {
              schema: {
                $ref: "#/definitions/Statistics",
              },
            },
          },
        },
      },
    },
  },
  security: [{ Bearer: [] }],
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
        $ref: "#/definitions/StatisticEntry",
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
    200: {
      description: "Statistic Record Added Succesfully",
      schema: {
        properties: {
          success: { type: "boolean" },
          statistics: {
            type: "object",
            properties: {
              schema: {
                $ref: "#/definitions/Statistics",
              },
            },
          },
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
};
