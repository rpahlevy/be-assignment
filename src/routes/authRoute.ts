import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { login, register } from '../controllers/authController';

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', register);
  fastify.post('/login', login);
}

export default authRoutes;
