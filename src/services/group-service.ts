import { notFoundError, unauthorizedLeaderError } from "@/errors";
import groupRepository from "@/repositories/group-repository";
import participantRepository from "@/repositories/participant-repository";

async function findAllUserGroup(userId: number) {
  const groups = await participantRepository.getUserGroupsByUserId(userId);
  if (!groups) throw notFoundError();

  return groups;
}

async function createGroup(userId: number, groupName: string) {
  const group = await groupRepository.create({
    name: groupName,
    createdBy: userId,
  });

  const data = {
    userId,
    groupId: group.id,
    accepted: true,
  };

  await participantRepository.create(data);
  return group;
}

async function checkGroupCreator(userId: number, groupId: number) {
  const group = await groupRepository.getGroupById(groupId);
  if (group.createdBy !== userId) throw unauthorizedLeaderError();
}

const groupService = {
  findAllUserGroup,
  createGroup,
  checkGroupCreator
};

export default groupService;
