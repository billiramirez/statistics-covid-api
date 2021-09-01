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

      res.status(500).json({ success: true, token: token });
    } catch (err) {
      res.status(500).json({ success: false, status: "INTERNAL_SERVER_ERROR" });
    }
  },
];

POST.apiDoc = {
  description: "Sign Up a User",
  operationId: "signupAUser",
  tags: ["users", "creating"],
  parameters: [
    {
      in: "body",
      name: "userr",
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
