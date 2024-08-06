import { FastifyRequest, FastifyReply } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const { data, error } = await request.server.supabase.auth.getUser(token);

  if (error || !data.user) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  request.user = data.user;
}
