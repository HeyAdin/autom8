import { PrismaClient } from "../generated/prisma/client.js";
import "dotenv/config";
declare global {
    var prisma: PrismaClient;
}
export declare const prisma: PrismaClient;
export default prisma;
//# sourceMappingURL=client.d.ts.map