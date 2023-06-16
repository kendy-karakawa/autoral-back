import { prisma } from "@/config";
import { createExpenseType } from "@/services";

async function createExpense(data: createExpenseType) {
    return prisma.expenses.create({
        data,
    })
}


const expenseRepository = {
    createExpense
}

export default expenseRepository