import { createUser, getUsersWithSearchTerm } from "@/controllers";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { createUserSchema, groupIdSchema } from "@/schemas";
import { Router } from "express";

const userRouter = Router();

userRouter
  .post("/", validateBody(createUserSchema), createUser)
  .get("/search/:searchTerm", authenticateToken, validateQuery(groupIdSchema), getUsersWithSearchTerm);

export default userRouter;
