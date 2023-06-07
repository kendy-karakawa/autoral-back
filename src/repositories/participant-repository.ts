import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.ParticipantsUncheckedCreateInput) {
  return prisma.participants.create({
    data,
  });
}

async function getGroupByUserId(userId: number) {
  return prisma.participants.findMany({
   where:{
    OR:[
        
    ]
   }
  });
}

const participantRepository = {
  create,
  getGroupByUserId,
};

export default participantRepository;
