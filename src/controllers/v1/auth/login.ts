import { Operation } from "express-openapi";
import { signIn } from "../../../services";

export const POST: Operation = [
  async (req: any, res: any, next: any) => {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const response = await signIn(email, password);
      if (!response || !response.token || !response.refreshToken)
        return res
          .status(500)
          .json({ success: false, status: "INTERNAL_SERVER_ERROR" });

      res.status(200).json({
        success: true,
        token: response.token,
        refreshToken: response.refreshToken,
      });
    } catch (err) {
      res.status(500).json({ success: false, status: "INTERNAL_SERVER_ERROR" });
    }
  },
];

POST.apiDoc = {
  description: "Log in a User",
  operationId: "loginUser",
  tags: ["users", "reading"],
  parameters: [
    {
      in: "body",
      name: "user",
      description: "The entire object for a New Statistic Entry",
      required: true,
      schema: {
        $ref: "#/definitions/UserCredentials",
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
