import { AuthenticatedRequest } from "@/middlewares";
import participantService from "@/services/participant-service";
import { Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function getAcceptedStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.params 
        const status = await participantService.getAcceptedStatus(userId, Number(groupId))
        res.status(httpStatus.OK).send(status)
    } catch (error) {
        next(error)
    }
}

export async function updateAcceptedStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.body
        const {participantId} = req.params
        await participantService.updateAcceptedStatus(userId, Number(groupId), Number(participantId))
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        next(error)
    }
}

export async function deleteParticipant(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.query
        const {participantId} = req.params
        await participantService.deleteParticipant(userId, Number(groupId), Number(participantId))
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        next(error)
    }
}