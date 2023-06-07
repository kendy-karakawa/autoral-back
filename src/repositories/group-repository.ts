import { prisma } from "@/config"
import { Prisma } from "@prisma/client";

async function create(data: Prisma.GroupsUncheckedCreateInput) {
   return prisma.groups.create({
    data
   })
}

const groupRepository = {
    create
}

export default groupRepository