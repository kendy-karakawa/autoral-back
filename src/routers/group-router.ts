import { createGroup, findAllUserGroup } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createGroupSchema } from "@/schemas";
import { Router } from "express";

const groupRouter = Router();

groupRouter
  .all("/*", authenticateToken)
  .get("/", findAllUserGroup)
  .post("/", validateBody(createGroupSchema), createGroup);

export default groupRouter;
