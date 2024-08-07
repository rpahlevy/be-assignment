import { FastifyInstance } from "fastify";
import { getPaymentHistories } from "../controllers/paymentHistoryController";
import { authMiddleware } from "../middlewares/auth";

async function paymentHistoryRoutes(fastify: FastifyInstance) {
  fastify.get("/payment-histories", { preHandler: [authMiddleware] }, getPaymentHistories);
}

export default paymentHistoryRoutes;
