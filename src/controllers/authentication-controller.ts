import authenticationService from "@/services/authentication-service";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function signIn (req: Request, res:Response, next:NextFunction) {
    const {email, password} = req.body
    try {
        const result = await authenticationService.signIn(email, password)
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        next(error)
    }
}