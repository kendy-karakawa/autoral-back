import { AuthenticatedRequest } from "@/middlewares";
import participantService from "@/services/participant-service";
import { Response, NextFunction } from "express";
import httpStatus from "http-status";


export default async function getAcceptedStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.params 
        const status = await participantService.getAcceptedStatus(userId, Number(groupId))
        res.status(httpStatus.OK).send(status)
    } catch (error) {
        next(error)
    }
}