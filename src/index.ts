import Fastify, { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { supabase } from './config/supabase';
import prisma from './config/prisma';
import authRoutes from './routes/authRoute';
import paymentAccountRoutes from './routes/paymentAccountRoute';
import paymentHistoryRoutes from './routes/paymentHistoryRoute';
import transactionRoutes from './routes/transactionRoute';

const app = Fastify({ logger: true });

app.register(fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.decorate('prisma', prisma);
  fastify.decorate('supabase', supabase);
}));

// Register routes
app.register(authRoutes);
app.register(paymentAccountRoutes);
app.register(paymentHistoryRoutes);
app.register(transactionRoutes);

// Start the server
const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
