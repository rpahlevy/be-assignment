import { FastifyRequest, FastifyReply } from 'fastify';
import { handleRegister, handleLogin } from '../services/authService';
import { AuthRequest } from '../types/requests';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as AuthRequest;
    const session = await handleRegister(request.server.supabase, email, password);
    reply.send(session);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body as AuthRequest;
    const session = await handleLogin(request.server.supabase, email, password);
    reply.send(session);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
};
