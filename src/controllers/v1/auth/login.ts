import { Operation } from "express-openapi";
import { signIn } from "../../../services";

export const POST: Operation = [
  async (req: any, res: any, next: any) => {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const token = await signIn(email, password);
      if (!token)
        return res
          .status(500)
          .json({ success: false, status: "INTERNAL_SERVER_ERROR" });

      res.status(200).json({ success: true, token: token });
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
      description: "The entire object Credentials for Log in",
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
    200: {
      description: "User Logged In",
      schema: {
        properties: {
          success: { type: "boolean" },
          token: { type: "string" },
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
