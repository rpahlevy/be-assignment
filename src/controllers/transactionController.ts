import { TRANSACTION_TYPE } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import { handleTransaction } from '../services/transactionService';
import { SendRequest, WithdrawRequest } from '../types/requests';

export const send = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sender_account_number, receiver_account_number, amount, currency } = request.body as SendRequest;
    const user_id = request.user.id;

    const transaction = await handleTransaction(user_id, sender_account_number, receiver_account_number, amount, currency, TRANSACTION_TYPE.SEND);
    reply.send(transaction);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const withdraw = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { account_number, amount, currency } = request.body as WithdrawRequest;
    const user_id = request.user.id;

    const transaction = await handleTransaction(user_id, account_number, null, amount, currency, TRANSACTION_TYPE.WITHDRAW);
    reply.send(transaction);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
