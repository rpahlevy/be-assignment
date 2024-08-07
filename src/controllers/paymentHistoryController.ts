import { FastifyReply, FastifyRequest } from "fastify";
import { getPaymentHistoriesByUserId } from "../services/paymentHistoryService";
import { PaymentHistoryRequest } from "../types/requests";

export const getPaymentHistories = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;
    const histories = await getPaymentHistoriesByUserId(user_id, request.query as PaymentHistoryRequest);
    reply.send(histories);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
