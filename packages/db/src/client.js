import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
console.log("i reached before the connection string");
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
console.log("i reached here");
export const prisma = globalThis.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = prisma;
console.log("finish");
export default prisma;
