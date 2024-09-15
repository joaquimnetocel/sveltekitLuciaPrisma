import { PrismaClient } from '@prisma/client';
// OU: import { PrismaClient } from '@prisma/client/edge'

const prismaClient = global.prismaClient || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
	global.prismaClient = prismaClient;
}

export { prismaClient };
