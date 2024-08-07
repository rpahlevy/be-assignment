import { FastifyInstance } from "fastify";
import { login, register } from "../controllers/authController";
import { authRequestSchema, authResponseSchema } from "../schemas/authSchemas";
import { errorResponseSchema } from "../schemas/globalSchema";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      description: "Register new User",
      body: authRequestSchema,
      response: {
        200: authResponseSchema,
        400: errorResponseSchema,
      },
    },
    handler: register,
  });

  fastify.post("/login", {
    schema: {
      description: "Login existing User",
      body: authRequestSchema,
      response: {
        200: authResponseSchema,
        400: errorResponseSchema,
      },
    },
    handler: login,
  });
}

export default authRoutes;
