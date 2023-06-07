import { notFoundError } from "@/errors";
import groupRepository from "@/repositories/group-repository";
import participantRepository from "@/repositories/participant-repository";

async function findAllUserGroup(userId: number) {
  const groups = await groupRepository.getUserGroupsByUserId(userId);
  if (!groups) throw notFoundError();
  return groups;
}

async function createGroup(userId: number, groupName: string) {
  const group = await groupRepository.create({
    name: groupName,
    createdBy: userId,
  });
  return group;
}

const groupService = {
  findAllUserGroup,
};

export default groupService;
