import Fastify, { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { supabase } from './config/supabase';
import prisma from './config/prisma';
import authRoutes from './routes/authRoute';
import paymentAccountRoutes from './routes/paymentAccountRoute';
import paymentHistoryRoutes from './routes/paymentHistoryRoute';
import transactionRoutes from './routes/transactionRoute';
import fastifyFormbody from '@fastify/formbody';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const app = Fastify({ logger: true });

app.register(fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.decorate('prisma', prisma);
  fastify.decorate('supabase', supabase);
}));

// swagger
app.register(fastifyFormbody);
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'BEASGN - BE Assignment',
      description: 'A backend service project implementing an Account Manager and Payment Manager using Node.js, Fastify, and Prisma. This project includes user registration, login, account management, and transaction processing, with Docker setup and Swagger documentation for API endpoints.',
      version: '1.0.0',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Enter JWT Bearer token **_with prefix_**, e.g "Bearer asdfg123"',
      }
    },
  },
});
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    // docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

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
