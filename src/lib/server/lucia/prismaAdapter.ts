import { prismaClient } from "../prismaClient";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

export const prismaAdapter = new PrismaAdapter(prismaClient.session, prismaClient.user);