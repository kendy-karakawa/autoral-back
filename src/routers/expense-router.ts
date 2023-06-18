import { createExpense, deleteExpense, getAllExpense } from "@/controllers";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createExpenseSchema, groupIdSchema } from "@/schemas";
import { Router } from "express";

const expenseRouter = Router();

expenseRouter
    .all("/*", authenticateToken)
    .post("/", validateBody(createExpenseSchema) ,createExpense)
    .get("/:groupId",validateParams(groupIdSchema), getAllExpense)
    .delete("/:expenseId", deleteExpense)


export default expenseRouter;
