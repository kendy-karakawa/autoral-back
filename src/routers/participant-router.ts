import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import getAcceptedStatus from "@/controllers/participant-controller";

const participantRouter = Router();

participantRouter
  .all("/*", authenticateToken)
  .get("/:groupId", getAcceptedStatus)
  .put("/:participantId",)

  
export default participantRouter;
