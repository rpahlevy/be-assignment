// src/routes/paymentAccount.ts
import { FastifyInstance } from 'fastify';
import { createPaymentAccount, getPaymentAccounts } from '../controllers/paymentAccountController';
import { authMiddleware } from '../middlewares/auth';

async function paymentAccountRoutes(fastify: FastifyInstance) {
  fastify.get('/payment-accounts', { preHandler: [authMiddleware] }, getPaymentAccounts);
  fastify.post('/payment-accounts', { preHandler: [authMiddleware] }, createPaymentAccount);
}

export default paymentAccountRoutes;
