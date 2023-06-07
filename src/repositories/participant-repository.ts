import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.ParticipantsUncheckedCreateInput) {
  return prisma.participants.create({
    data,
  });
}

const participantRepository = {
  create,
};

export default participantRepository;
