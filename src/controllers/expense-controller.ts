import { AuthenticatedRequest } from "@/middlewares";
import expenseService from "@/services/expense-service";
import { Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function createExpense(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
    try {
        const {userId} = req
        const {name, totalValue, groupId, participantsIds} = req.body
        await expenseService.createExpense(userId, name, totalValue, groupId, participantsIds)
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        next(error);
    }
}

export async function getAllExpense(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction    
) {
    try {
        const {userId} = req
        const {groupId} = req.params
        const result = await expenseService.getAllExpense(userId, Number(groupId))
        
        res.status(httpStatus.OK).send(result)
    } catch (error) {
        next(error);
    }
    
}
