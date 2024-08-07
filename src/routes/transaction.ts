// src/routes/transaction.ts
import { Decimal } from '@prisma/client/runtime/library';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authMiddleware } from '../middlewares/auth';

async function transactionRoutes(fastify: FastifyInstance) {
  // Get all transactions
  fastify.get('/transactions', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const transactions = await fastify.prisma.transaction.findMany();
    reply.send(transactions);
  });

  // Withdraw API
  fastify.post('/withdraw', { preHandler: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { account_number, amount, currency } = request.body as { account_number: string; amount: number; currency: string };
    
    // Validate input
    if (!account_number || amount <= 0) {
      return reply.status(400).send({ error: 'Invalid account number or amount' });
    }
    if (!currency) {
      return reply.status(400).send({ error: 'Enter currency' });
    }

    const account = await fastify.prisma.paymentAccount.findFirst({
      where: {
        account_number: account_number,
        user_id: request.user.id
      }
    });

    if (!account) {
      return reply.status(404).send({ error: 'Account not found' });
    }

    if (account.balance < (new Decimal(amount))) {
      return reply.status(400).send({ error: 'Insufficient balance' });
    }

    const transaction = await fastify.prisma.transaction.create({
      data: {
        sender_account_id: account.id,
        receiver_account_id: account.id, // Since it's a withdrawal, the receiver is the same account
        amount,
        currency,
        status: 'PENDING',
      },
    });

    // decrement only after tx success
    // await fastify.prisma.paymentAccount.update({
    //   where: { id: account.id },
    //   data: { balance: { decrement: amount } },
    // });

    await fastify.prisma.paymentHistory.create({
      data: {
        account_id: account.id,
        transaction_id: transaction.id,
        amount,
        transaction_type: 'WITHDRAW',
      },
    });

    reply.send(transaction);
  });

}

export default transactionRoutes;
