import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/auth';
import { withdraw, send } from '../controllers/transactionController';

async function transactionRoutes(fastify: FastifyInstance) {
  // Get all transactions
  fastify.get('/transactions', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const transactions = await fastify.prisma.transaction.findMany();
    reply.send(transactions);
  });

  fastify.post('/withdraw', { preHandler: [authMiddleware] }, withdraw);
  fastify.post('/send', { preHandler: [authMiddleware] }, send);
}

export default transactionRoutes;
