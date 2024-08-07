import { FastifyRequest, FastifyReply } from "fastify";
import { handleRegister, handleLogin } from "../services/authService";
import { AuthRequest } from "../types/requests";

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const session = await handleRegister(
      request.server.supabase,
      request.body as AuthRequest
    );
    reply.send(session);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const session = await handleLogin(
      request.server.supabase,
      request.body as AuthRequest
    );
    reply.send(session);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
