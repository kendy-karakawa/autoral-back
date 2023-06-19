import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function findByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function getUsersWithSearchTerm(searchTerm: string) {
  return prisma.user.findMany({
    where: {
      name: {
        contains: searchTerm,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

async function getUserNameByParticipantId(participantId: number) {
  const user = await prisma.user.findFirst({
    where:{
      Participants:{
        some:{
          id:participantId
        }
      }
    },
    select:{
      name: true
    }
  })

  return user.name
}

const userRepository = {
  findByEmail,
  create,
  getUsersWithSearchTerm,
  getUserNameByParticipantId
};

export default userRepository;
