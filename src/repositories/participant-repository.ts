import { prisma } from "@/config";
import { ManyParticipantsData } from "@/protocols";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.ParticipantsUncheckedCreateInput) {
  return prisma.participants.create({
    data,
  });
}
async function createMany(data: ManyParticipantsData) {
  return prisma.participants.createMany({
    data
  })
}

async function getParticipantsByGroupId(groupId: number) {
  return prisma.participants.findMany({
    where:{
      groupId
    },
    select: {
      id: true,
      userId: true,
      accepted: true,
      User:{
        select:{
          name: true,
          image: true,
          
        }
      }
      
    }
  })
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

async function checkParticipant(userId: number, groupId: number) {
  return prisma.participants.findFirst({
    where:{
      userId,
      groupId
    }
  })
}

async function checkParticipantById (id: number, groupId: number) {
  return prisma.participants.findFirst({
    where:{
      id,
      groupId
    }
  })
}

const participantRepository = {
  create,
  getParticipantsByGroupId,
  getUserGroupsByUserId,
  updateAcceptedStatus,
  deleteParticipant,
  checkParticipant,
  createMany,
  checkParticipantById
};

export default participantRepository;
