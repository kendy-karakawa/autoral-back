import { AuthenticatedRequest } from "@/middlewares";
import { UserArray } from "@/protocols";
import participantService from "@/services/participant-service";
import { Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function getGroupParticipants(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.params 
        const participants = await participantService.getGroupParticipants(userId, Number(groupId))
        res.status(httpStatus.OK).send(participants)
    } catch (error) {
        next(error)
    }
}

export async function getAcceptedGroupParticipants(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.params 
        const participants = await participantService.getAcceptedGroupParticipants(userId, Number(groupId))
        res.status(httpStatus.OK).send(participants)
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

export async function cretaeParticipants(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {userId} = req
        const {groupId} = req.params
        const participantsIds = req.body as UserArray

        await participantService.cretaeParticipants(userId, Number(groupId), participantsIds)
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        next(error)
    }
}