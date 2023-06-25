import { signIn } from "@/controllers/authentication-controller";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router()

authenticationRouter.post('/', validateBody(signInSchema), signIn)

export default authenticationRouter