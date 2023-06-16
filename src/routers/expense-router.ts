import { createExpense } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createExpenseSchema } from "@/schemas";
import { Router } from "express";

const expenseRouter = Router();

expenseRouter
    .all("/*", authenticateToken)
    .post("/", validateBody(createExpenseSchema) ,createExpense)


export default expenseRouter;
