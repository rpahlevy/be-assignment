// src/routes/paymentAccount.ts
import { ACCOUNT_TYPE } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/auth';

async function paymentAccountRoutes(fastify: FastifyInstance) {
  fastify.get('/payment-accounts', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const accounts = await fastify.prisma.paymentAccount.findMany({
      where: {
        user_id: request.user.id
      }
    });
    reply.send(accounts);
  });

  // Create a new payment account
  fastify.post('/payment-accounts', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { account_number, account_type, balance, currency } = request.body as {
      account_number: string;
      account_type: ACCOUNT_TYPE;
      balance: number;
      currency: string;
    };
    const user_id = request.user.id;

    // Validation
    if (!account_number) {
      return reply.status(400).send({ error: 'Missing/invalid account number' });
    }
    if (!currency) {
      return reply.status(400).send({ error: 'Missing/invalid currency' });
    }
    if (!Object.values(ACCOUNT_TYPE).includes(account_type)) {
      return reply.status(400).send({ error: 'Invalid account type. Only accept: '+ Object.values(ACCOUNT_TYPE).join(', ') });
    }
    if (typeof balance !== 'number' || balance < 0) {
      return reply.status(400).send({ error: 'Invalid balance' });
    }

    try {
      const newAccount = await fastify.prisma.paymentAccount.create({
        data: {
          user_id,
          account_number,
          account_type,
          balance,
          currency,
        },
      });
      reply.send(newAccount);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target.includes('account_number')) {
        return reply.status(400).send({ error: 'Account number already exists' });
      }
      // Log and return a generic error message for other cases
      fastify.log.error(error);
      return reply.status(500).send({ error: 'An error occurred while creating the account' });
    }
  });
}

export default paymentAccountRoutes;
