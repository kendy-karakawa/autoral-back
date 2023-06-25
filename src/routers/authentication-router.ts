import { signIn } from "@/controllers/authentication-controller";
import { Router } from "express";

const authenticationRouter = Router()

authenticationRouter.post('/', signIn)

export default authenticationRouter 