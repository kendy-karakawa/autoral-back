import userService from "@/services/user-service";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";


export async function createUser(req: Request, res: Response, next: NextFunction) {
    const {name, email, phone, password} = req.body;

    try {
        const user = await userService.createUser({name, email, phone, password})
        res.status(httpStatus.OK).send({
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone
        })
    } catch (error) {
        next(error)
    }
}