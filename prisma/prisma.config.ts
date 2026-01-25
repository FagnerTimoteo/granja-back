import { defineConfig } from '@prisma/client';

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
  generator: {
    client: {
      provider: 'prisma-client-js',
    },
  },
});
