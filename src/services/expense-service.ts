import { Expenses } from "@prisma/client";
import participantService from "./participant-service";
import expenseRepository from "@/repositories/expense-repository";
import divisionService from "./division-service";
import { DivisionsParam, ParticipantsIds } from "@/protocols";

async function createExpense(userId: number, name: string, totalValue: number, groupId: number, participantsIds: ParticipantsIds) {
  const participantId = await participantService.getParticipantId(
    userId,
    groupId
  );

  await participantService.checkParticipantsAreFromThisGroup(groupId, participantsIds)

  const expenseData: createExpenseType = {
    name,
    value:totalValue,
    paidBy: participantId,
    groupId
  };

  const expense = await expenseRepository.createExpense(expenseData);

  const divisionsParam: DivisionsParam = {
    paidBy: expense.paidBy,
    totalValue: expense.value,
    expenseId: expense.id,
    participantsIds,
  };

  return await divisionService.splitExpense(divisionsParam);
}

async function getAllExpense(userId:number, groupId:number) {
  return await expenseRepository.getAllExpense(groupId)
}

export type createExpenseType = Pick<Expenses, "name" | "value" | "paidBy" | "groupId">;

const expenseService = {
  createExpense,
  getAllExpense
};

export default expenseService;
