import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import getAcceptedStatus from "@/controllers/participant-controller";

const participantRouter = Router();

participantRouter
  .all("/*", authenticateToken)
  .get("/:groupId", getAcceptedStatus);

  
export default participantRouter;
