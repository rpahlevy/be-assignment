import { FastifyReply, FastifyRequest } from "fastify";
import { getAccountsByUserId, handleCreatePaymentAccount } from "../services/paymentAccountService";
import { PaymentAccountRequest } from "../types/requests";

export const getPaymentAccounts = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;
    const accounts = await getAccountsByUserId(user_id);
    reply.send(accounts);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const createPaymentAccount = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;
    const newAccount = await handleCreatePaymentAccount(user_id, request.body as PaymentAccountRequest)
    reply.send(newAccount);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}