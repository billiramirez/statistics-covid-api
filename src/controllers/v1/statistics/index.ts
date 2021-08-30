import { NextFunction } from "express";

module.exports = {
  get: [
    function (req: Request, res: any, next: NextFunction) {
      res.status(200).json([{ name: "fred" }]);
    },
  ],

  post: function (req: Request, res: any, next: NextFunction) {
    res.status(500).json({});
  },
};

module.exports.post.apiDoc = {
  description: "Create a new user.",
  operationId: "createUser",
  tags: ["users", "creating"],
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
