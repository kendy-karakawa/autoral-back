import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.GroupsUncheckedCreateInput) {
  return prisma.groups.create({
    data,
  });
}

async function getUserGroupsByUserId(userId: number) {
  return prisma.groups.findMany({
    where: {
      OR: [
        {
          createdBy: userId,
        },
        {
          Participants: {
            some: {
              userId,
            },
          },
        },
      ],
    },
  });
}

async function getGroupById(groupId: number) {
  return prisma.groups.findFirst({
    where: {
      id: groupId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      createdBy: true,
    },
  });
}

const groupRepository = {
  create,
  getUserGroupsByUserId,
  getGroupById,
};

export default groupRepository;
