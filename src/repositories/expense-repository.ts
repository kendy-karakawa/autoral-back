import { prisma } from "@/config";
import { createExpenseType } from "@/services";

async function createExpense(data: createExpenseType) {
    return prisma.expenses.create({
        data,
    })
}

async function getAllExpense(groupId: number) {
    return prisma.expenses.findMany({
        where: {
            groupId
        },
        include:{
            Participants:{
                include:{
                    User:{
                        select:{
                            name:true,
                            image:true
                        }
                    }
                }
            },
            Divisions:{
                include:{
                    Participants:{
                        include:{
                            User:{
                                select:{
                                    name:true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    
}


const expenseRepository = {
    createExpense,
    getAllExpense
}

export default expenseRepository