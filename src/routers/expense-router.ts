import { createExpense } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const expenseRouter = Router();

expenseRouter
    .all("/*", authenticateToken)
    .post("/", createExpense)


export default expenseRouter;
