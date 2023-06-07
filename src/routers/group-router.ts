import { findAllUserGroup } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const groupRouter = Router()

groupRouter.all('/*', authenticateToken)
.get('/', findAllUserGroup)

export default groupRouter