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

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;
