import Fastify, { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyPlugin from 'fastify-plugin';
import { supabase } from './config/supabase';
import authRoutes from './routes/auth';
import paymentAccountRoutes from './routes/paymentAccount';
import transactionRoutes from './routes/transaction';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.decorate('prisma', prisma);
  fastify.decorate('supabase', supabase);
}));

// Register routes
app.register(authRoutes);
app.register(paymentAccountRoutes);
app.register(transactionRoutes);

// Start the server
const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
    app.log.info(`server listening on ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
