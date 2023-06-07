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

const groupRepository = {
  create,
  getUserGroupsByUserId,
};

export default groupRepository;
