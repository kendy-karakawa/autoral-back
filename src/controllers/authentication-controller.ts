import authenticationService from "@/services/authentication-service";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export async function signIn (req: Request, res:Response, next:NextFunction) {
    const {email, password} = req.body
    console.log(`Entrei no controler e recebi email:${email}, senha: ${password} e vou para o service`)
    try {
        const result = await authenticationService.signIn(email, password)
        console.log(`sai do service e recebi o result:${result} e vou responder com 201 e o result`)
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        next(error)
    }
}