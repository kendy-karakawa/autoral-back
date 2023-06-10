import { AuthenticatedRequest } from "@/middlewares";
import userService from "@/services/user-service";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { number, string } from "joi";


export async function createUser(req: Request, res: Response, next: NextFunction) {
    const {name, email, phone, password} = req.body;

    try {
        const user = await userService.createUser({name, email, phone, password})
        res.status(httpStatus.CREATED).send({
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone
        })
    } catch (error) {
        next(error)
    }
}

export async function getUsersWithSearchTerm(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const {searchTerm} = req.params
        const {groupId} = req.query
        const {userId} = req
        const users = await userService.getUsersWithSearchTerm(searchTerm, userId, Number(groupId))
        res.status(httpStatus.OK).send(users)
    } catch (error) {
        next(error)
    }
}