import { Router } from "express";
import { authenticateToken, validateBody, validateParams, validateQuery } from "@/middlewares";
import {cretaeParticipants, deleteParticipant, getGroupParticipants, updateAcceptedStatus} from "@/controllers/participant-controller";
import { groupIdSchema } from "@/schemas";
import { participantIdSchema } from "@/schemas/partcipants-chemas";


const participantRouter = Router();

participantRouter
  .all("/*", authenticateToken)
  .get("/:groupId", validateParams(groupIdSchema), getGroupParticipants)
  .post("/:groupId", validateParams(groupIdSchema), cretaeParticipants)
  .put("/update/:participantId",validateParams(participantIdSchema),validateBody(groupIdSchema), updateAcceptedStatus)
  .delete("/delete/:participantId",validateParams(participantIdSchema),validateQuery(groupIdSchema), deleteParticipant)
  
export default participantRouter;
