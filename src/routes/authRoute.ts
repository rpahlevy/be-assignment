import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function authRoutes(fastify: FastifyInstance) {
  // fastify.get('/register', async (request: FastifyRequest, reply: FastifyReply) => {
  //   reply.send({msg:'register'})
  // })

  fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };
    const { data, error } = await fastify.supabase.auth.signUp({ email, password });
    
    if (error) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.send(data.session);
    }
  });

  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };
    const { data, error } = await fastify.supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.send(data.session);
    }
  });
}

export default authRoutes;
