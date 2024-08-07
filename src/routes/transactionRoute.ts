import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth";
import { withdraw, send, transactions } from "../controllers/transactionController";

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get("/transactions", { preHandler: [authMiddleware] }, transactions);
  fastify.post("/withdraw", { preHandler: [authMiddleware] }, withdraw);
  fastify.post("/send", { preHandler: [authMiddleware] }, send);
}

export default transactionRoutes;
