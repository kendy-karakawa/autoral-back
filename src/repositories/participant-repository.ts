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

async function updateAcceptedStatus(participantId:number) {
  return prisma.participants.update({
    where:{
      id: participantId
    },
    data:{
      accepted: true
    }
  })
}

async function deleteParticipant(participantId:number) {
  return prisma.participants.delete({
    where:{
      id: participantId
    }
  })
}

async function checkParticipantId(userId: number, groupId: number) {
  return prisma.participants.findFirst({
    where:{
      userId,
      groupId
    },
    select:{
      id: true
    }
  })
}

const participantRepository = {
  create,
  getAcceptedStatus,
  getUserGroupsByUserId,
  updateAcceptedStatus,
  deleteParticipant,
  checkParticipantId
};

export default participantRepository;
