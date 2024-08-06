import { PrismaClient } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    supabase: SupabaseClient;
  }

  interface FastifyRequest {
    user: any; // Add your user type here
  }
}
