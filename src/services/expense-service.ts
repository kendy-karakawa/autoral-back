import { Expenses } from "@prisma/client";
import participantService from "./participant-service";
import expenseRepository from "@/repositories/expense-repository";
import divisionService from "./division-service";
import {
  DivisionsParam,
  ExpensesWithDivisions,
  ParticipantsIds,
  createExpenseType,
  getAllExpenseType,
} from "@/protocols";
import participantRepository from "@/repositories/participant-repository";
import divisionRepository from "@/repositories/division-repository";
import userRepository from "@/repositories/user-repository";

async function createExpense(
  userId: number,
  name: string,
  totalValue: number,
  groupId: number,
  participantsIds: ParticipantsIds
) {
  const participantId = await participantService.getParticipantId(
    userId,
    groupId
  );

  await participantService.checkParticipantsAreFromThisGroup(
    groupId,
    participantsIds
  );

  const expenseData: createExpenseType = {
    name,
    value: totalValue,
    paidBy: participantId,
    groupId,
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

async function getAllExpense(userId: number, groupId: number) {
  //return await expenseRepository.getAllExpense(groupId)
  const result: getAllExpenseType[] = await expenseRepository.getAllExpense(
    groupId
  );
  const expenses = await formatGetAllexpenseReturn(result);
  const numberOfGroupParticipants =
    await participantRepository.countGroupParticipantsWhenAceptIstrue(groupId);
  return { quantity: numberOfGroupParticipants, expenses };
}

async function formatGetAllexpenseReturn(originalList: getAllExpenseType[]) {
  const transformedList = originalList.map((obj) => ({
    expenseId: obj.id,
    name: obj.name,
    value: obj.value,
    createdAt: obj.createdAt,
    paidBy: {
      userId: obj.Participants.userId,
      name: obj.Participants.User.name,
      image: obj.Participants.User.image,
    },
    divisions: obj.Divisions.map((division) => ({
      name: division.Participants.User.name,
    })),
  }));
  return transformedList;
}

async function deleteExpense(userId: number, expenseId: number) {
  return await expenseRepository.deleteExpense(expenseId);
}

async function getGeneralExpensesValues(userId: number, groupId: number) {
  const participantId = await participantService.getParticipantId(
    userId,
    groupId
  );

  const group = await expenseRepository.sumGroupExpenses(groupId);
  const userPaid = await expenseRepository.sumUserPaidExpenses(
    groupId,
    participantId
  );

  
  const userPart = await getUserExpensesDivisionPart(groupId, participantId);
  const members = await getMembersDivisions(groupId);
  return { group, userPaid, userPart, members };
}

async function getUserExpensesDivisionPart(
  groupId: number,
  participantId: number
) {
  const result: ExpensesWithDivisions[] =
    await expenseRepository.getUserExpensesDivisionPart(groupId, participantId);
  const expensesDivisions = result.map(
    (obj) => obj.value / obj.Divisions.length
  );
  const totalValue = expensesDivisions.reduce(
    (acc, current) => acc + current,
    0
  );
  return totalValue;
}

async function getMembersDivisions(groupId: number) {
  const valuesList = await divisionRepository.getGroupDivisions(groupId);
  const transformedValuesList = await Promise.all(
    valuesList.map(async (obj) => ({
      name: await userRepository.getUserNameByParticipantId(obj.participantId),
      value: obj._sum.value,
    }))
  );

  return transformedValuesList;
}

const expenseService = {
  createExpense,
  getAllExpense,
  deleteExpense,
  getGeneralExpensesValues,
};

export default expenseService;
