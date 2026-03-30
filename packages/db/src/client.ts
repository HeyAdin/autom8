import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"

declare global {
    var prisma: PrismaClient;
}

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const prisma: PrismaClient = globalThis.prisma ?? new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export * from '../generated/prisma/client.js'