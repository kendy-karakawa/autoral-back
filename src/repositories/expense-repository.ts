import { prisma } from "@/config";
import { createExpenseType } from "@/protocols";

async function createExpense(data: createExpenseType) {
  return prisma.expenses.create({
    data,
  });
}

async function getAllExpense(groupId: number) {
  return prisma.expenses.findMany({
    where: {
      groupId,
    },
    include: {
      Participants: {
        include: {
          User: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      Divisions: {
        include: {
          Participants: {
            include: {
              User: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function deleteExpense(expenseId: number) {
  return prisma.expenses.delete({
    where: {
      id: expenseId,
    },
  });
}

async function sumGroupExpenses(groupId: number) {
    const result = await prisma.expenses.aggregate({
        _sum:{
            value: true
        },
        where:{
            groupId
        }
    })

    return result._sum.value
}

async function sumUserPaidExpenses( groupId: number, participantId: number ) {
  const result = await prisma.expenses.aggregate({
      _sum:{
          value: true
      },
      where:{
          groupId,
          paidBy: participantId
      }
  })

  return result._sum.value
}

async function getUserExpensesDivisionPart(participantId: number, divisionPart: boolean ) {
  return prisma.expenses.findMany({
    where:{
      divisionPart,
      Divisions:{
        some:{
          participantId
        }
        
      }
    },
    include:{
      Divisions: true
    }
      
  })
}

const expenseRepository = {
  createExpense,
  getAllExpense,
  deleteExpense,
  sumGroupExpenses,
  sumUserPaidExpenses,
  getUserExpensesDivisionPart
};

export default expenseRepository;
