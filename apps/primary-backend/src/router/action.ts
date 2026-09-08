import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { AutomCreateSchema } from "../types/automSchem.js";
import { prisma } from "@repo/db";
import { AuthRequest } from "../utils/requestType.js";

const router = Router();

export const actionRouter = router;