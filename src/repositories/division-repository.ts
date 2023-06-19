import { prisma } from "@/config";
import { ManyDivisionType } from "@/services";

async function createDivisions(data: ManyDivisionType) {
  return await prisma.divisions.createMany({
    data,
  });
}

// async function getGroupDivisions(groupId: number) {
//     return await prisma.divisions.findMany({
//         where:{
//             Participants:{
//                 groupId
//             }
//         },
//         select:{
//             value: true,
//             participantId: true
//         },
//     })
// }

async function getGroupDivisions(groupId: number) {
  return await prisma.divisions.groupBy({
    by: ["participantId"],
    where: {
      Participants: {
        groupId,
      },
    },
    _sum: {
      value: true,
    },
  });
}

const divisionRepository = {
  createDivisions,
  getGroupDivisions,
};

export default divisionRepository;
