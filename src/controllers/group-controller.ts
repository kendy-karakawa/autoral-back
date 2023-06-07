import { AuthenticatedRequest } from "@/middlewares";
import groupService from "@/services/group-service";

import { Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function findAllUserGroup(req: AuthenticatedRequest, res:Response, next:NextFunction) {
    try {
        const {userId} = req 
        const groups = await groupService.findAllUserGroup(userId)
        res.status(httpStatus.OK).send(groups)
    } catch (error) {
        next(error)
    }
    
}