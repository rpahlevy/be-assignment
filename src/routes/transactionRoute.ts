import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth";
import { withdraw, send, transactions } from "../controllers/transactionController";
import { sendRequestSchema, transactionResponseSchema, transactionsResponseSchema, withdrawRequestSchema } from "../schemas/transactionSchemas";
import { errorResponseSchema } from "../schemas/globalSchema";

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get("/transactions", {
    preHandler: [authMiddleware],
    schema: {
      description: 'Endpoint to get transactions for the authenticated user',
      security: [{ bearerAuth: [] }],
      response: {
        200: transactionsResponseSchema,
        400: errorResponseSchema,
      },
    },
    handler: transactions,
  });

  fastify.post("/withdraw", {
    preHandler: [authMiddleware],
    schema: {
      description: 'Endpoint to withdraw from an account',
      body: withdrawRequestSchema,
      security: [{ bearerAuth: [] }],
      response: {
        200: transactionResponseSchema,
        400: errorResponseSchema,
      },
    },
    handler: withdraw
  });

  fastify.post("/send", {
    preHandler: [authMiddleware],
    schema: {
      description: 'Endpoint to send money to another account',
      body: sendRequestSchema,
      security: [{ bearerAuth: [] }],
      response: {
        200: transactionResponseSchema,
        400: errorResponseSchema,
      },
    },
    handler: send
  });
}

export default transactionRoutes;
