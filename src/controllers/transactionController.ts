import { TRANSACTION_TYPE } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import { handleTransaction } from "../services/transactionService";
import { SendRequest } from "../types/requests";

export const send = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;

    const transaction = await handleTransaction(
      user_id,
      TRANSACTION_TYPE.SEND,
      request.body as SendRequest
    );
    reply.send(transaction);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const withdraw = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;

    const transaction = await handleTransaction(
      user_id,
      TRANSACTION_TYPE.WITHDRAW,
      request.body as SendRequest
    );
    reply.send(transaction);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
