import { prisma } from "@/config";
import { ManyDivisionType } from "@/services";

async function createDivisions(data: ManyDivisionType) {
    return await prisma.divisions.createMany({
        data
    })
}

const divisionRepository ={
    createDivisions
}

export default divisionRepository