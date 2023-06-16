import { AuthenticatedRequest } from "@/middlewares";
import { Response, NextFunction } from "express";
import groupService from "@/services/group-service";
import httpStatus from "http-status";

export async function findAllUserGroup(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const groups = await groupService.findAllUserGroup(userId);
    res.status(httpStatus.OK).send(groups);
  } catch (error) {
    next(error);
  }
}

export async function createGroup(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { groupName } = req.body;
    const { userId } = req;
    const group = await groupService.createGroup(userId, groupName);
    res.status(httpStatus.CREATED).send(group);
  } catch (error) {
    next(error);
  }
}
