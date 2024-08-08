import { FastifyInstance } from "fastify";
import {
  createRecurringPayment,
  getRecurringPayments,
} from "../controllers/recurringPaymentController";
import { authMiddleware } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/globalSchema";
import {
  getRecurringPaymentsResponseSchema,
  recurringPaymentRequestSchema,
  recurringPaymentResponseSchema,
} from "../schemas/recurringPaymentSchemas";

async function recurringPaymentRoutes(fastify: FastifyInstance) {
  fastify.get("/recurring-payments", {
    preHandler: [authMiddleware],
    schema: {
      description: "Get Recurring Payments for the authenticated user",
      security: [{ bearerAuth: [] }],
      response: {
        200: getRecurringPaymentsResponseSchema,
        400: errorResponseSchema
      },
    },
    handler: getRecurringPayments
  });

  fastify.post("/recurring-payments", {
    preHandler: [authMiddleware],
    schema: {
      description: "Create New Recurring Payment for the authenticated user",
      security: [{ bearerAuth: [] }],
      body: recurringPaymentRequestSchema,
      response: {
        200: recurringPaymentResponseSchema,
        400: errorResponseSchema
      },
    },
    handler: createRecurringPayment
  });
}

export default recurringPaymentRoutes;
