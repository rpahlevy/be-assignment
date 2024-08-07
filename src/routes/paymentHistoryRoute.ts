import { FastifyInstance } from "fastify";
import { getPaymentHistories } from "../controllers/paymentHistoryController";
import { authMiddleware } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/globalSchema";
import { paymentHistoryRequestSchema, paymentHistoryResponseSchema } from "../schemas/paymentHistorySchema";

async function paymentHistoryRoutes(fastify: FastifyInstance) {
  fastify.get("/payment-histories", {
    preHandler: [authMiddleware],
    schema: {
      description: "Get payment histories for the authenticated user",
      security: [{ bearerAuth: [] }],
      querystring: paymentHistoryRequestSchema,
      response: {
        200: paymentHistoryResponseSchema,
        400: errorResponseSchema,
      }
    },
    handler: getPaymentHistories
  });
}

export default paymentHistoryRoutes;
