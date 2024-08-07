import { FastifyInstance } from "fastify";
import {
  createPaymentAccount,
  getPaymentAccounts,
} from "../controllers/paymentAccountController";
import { authMiddleware } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/globalSchema";
import {
  getPaymentAccountsResponseSchema,
  paymentAccountRequestSchema,
  paymentAccountResponseSchema,
} from "../schemas/paymentAccountSchemas";

async function paymentAccountRoutes(fastify: FastifyInstance) {
  fastify.get("/payment-accounts", {
    preHandler: [authMiddleware],
    schema: {
      description: "Get Payment Accounts for the authenticated user",
      security: [{ bearerAuth: [] }],
      response: {
        200: getPaymentAccountsResponseSchema,
        400: errorResponseSchema
      },
    },
    handler: getPaymentAccounts
  });

  fastify.post("/payment-accounts", {
    preHandler: [authMiddleware],
    schema: {
      description: "Create New Payment Account for the authenticated user",
      security: [{ bearerAuth: [] }],
      body: paymentAccountRequestSchema,
      response: {
        200: paymentAccountResponseSchema,
        400: errorResponseSchema
      },
    },
    handler: createPaymentAccount
  });
}

export default paymentAccountRoutes;
