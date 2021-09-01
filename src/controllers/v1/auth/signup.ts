import { Operation } from "express-openapi";
import { findUserByEmail, signUp } from "../../../services";

export const POST: Operation = [
  async (req: any, res: any, next: any) => {
    const { email, password }: { email: string; password: string } = req.body;
    try {
      const existingUser = await findUserByEmail(req.body.email);

      if (existingUser)
        return res
          .status(400)
          .json({ success: false, status: "RESOURCE_ALREADY_EXISTS" });

      const token = await signUp(email, password);
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
  description: "Sign Up a User",
  operationId: "signupAUser",
  tags: ["users"],
  parameters: [
    {
      in: "body",
      name: "user",
      description: "The entire object credentials for Sign up",
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
      description: "User Registred",
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
