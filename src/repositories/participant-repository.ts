import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.ParticipantsUncheckedCreateInput) {
  return prisma.participants.create({
    data,
  });
}

async function getAcceptedStatus(userId: number, groupId: number) {
  return prisma.participants.findFirst({
    where: {
      userId,
      groupId,
    },
    select: {
      accepted: true,
    },
  });
}

async function getUserGroupsByUserId(userId: number) {
  return prisma.participants.findMany({
    where: {
      OR: [
        {
          userId
        },
        {
          User:{
            id: userId
          }
        }
      ],
    },
    include:{
      Groups:true
    }
  });
}

const participantRepository = {
  create,
  getAcceptedStatus,
  getUserGroupsByUserId,
};

export default participantRepository;
