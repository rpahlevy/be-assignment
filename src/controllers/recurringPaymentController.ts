import { FastifyReply, FastifyRequest } from "fastify";
import { getRecurringPaymentsByUserId, handleCreateRecurringPayment } from "../services/recurringPaymentService";
import { RecurringPaymentRequest } from "../types/requests";

export const getRecurringPayments = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;
    const recurringPayments = await getRecurringPaymentsByUserId(user_id);
    reply.send(recurringPayments);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const createRecurringPayment = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user_id = request.user.id;
    const newRecurringPayment = await handleCreateRecurringPayment(user_id, request.body as RecurringPaymentRequest);
    reply.send(newRecurringPayment);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
