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

async function deleteExpense(expenseId: number) {
    return prisma.expenses.delete({
        where:{
            id: expenseId
        }
    })
  }


const expenseRepository = {
    createExpense,
    getAllExpense,
    deleteExpense
}

export default expenseRepository