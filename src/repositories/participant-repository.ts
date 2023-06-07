import { prisma } from "@/config"
import { Prisma } from "@prisma/client";

async function getGroupByUserId(userId:number) {
   return prisma.participants.findMany({
        where:{
            userId
        },
        select:{
            Groups: true
        }
   })
}

const participantRepository = {
    getGroupByUserId
}

export default participantRepository