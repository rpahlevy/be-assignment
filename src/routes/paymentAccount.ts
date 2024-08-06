// src/routes/paymentAccount.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/auth';

async function paymentAccountRoutes(fastify: FastifyInstance) {
  fastify.get('/payment-accounts', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const accounts = await fastify.prisma.paymentAccount.findMany();
    reply.send(accounts);
  });

  // Create a new payment account
  fastify.post('/payment-accounts', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    console.log(request.user)
    const { account_number, account_type, balance } = request.body as {
      account_number: string;
      account_type: 'DEBIT' | 'CREDIT' | 'LOAN';
      balance: number;
    };
    const user_id = request.user.id;
    const newAccount = await fastify.prisma.paymentAccount.create({
      data: {
        user_id,
        account_number,
        account_type,
        balance,
      },
    });
    reply.send(newAccount);
  });
}

export default paymentAccountRoutes;
