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
  const userParticipantId = await participantService.getParticipantId(
    userId,
    groupId
  );
  
  await participantService.checkParticipantsAreFromThisGroup(
    groupId,
    participantsIds
  );
  
  const isUserPartOfDivision = participantsIds.find(obj => obj.id === userParticipantId )

  const expenseData: createExpenseType = {
    name,
    value: totalValue,
    paidBy: userParticipantId,
    groupId,
    divisionPart: isUserPartOfDivision ? true : false
  };

  const expense = await expenseRepository.createExpense(expenseData);

  const divisionsParam: DivisionsParam = {
    paidBy: expense.paidBy,
    totalValue: expense.value,
    expenseId: expense.id,
    participantsIds,
  };

  


  if(isUserPartOfDivision) {
    return await divisionService.splitExpenseWhenUserIsPartOfDivision(divisionsParam);
  }else{
    return await divisionService.splitExpenseWhenUserIsNotPartOfDivision(divisionsParam);
  } 
}

async function getAllExpense(userId: number, groupId: number) {
  const result: getAllExpenseType[] = await expenseRepository.getAllExpense(
    groupId
  );

  const expenses = await formatGetAllexpenseReturn(result);
  const numberOfGroupParticipants = await participantRepository.countGroupParticipantsWhenAceptIstrue(groupId);
  return { quantity: numberOfGroupParticipants, expenses };
}

async function formatGetAllexpenseReturn(originalList: getAllExpenseType[]) {
  const transformedList = originalList.map((obj) => ({
    expenseId: obj.id,
    name: obj.name,
    value: obj.value,
    divisionPart: obj.divisionPart,
    createdAt: obj.createdAt,
    paidBy: {
      userId: obj.Participants.userId,
      name: obj.Participants.User.name,
      image: obj.Participants.User.image,
    },
    divisions: obj.Divisions.filter((division)=>{
      return !(obj.divisionPart === false && obj.paidBy === division.participantId)
    })
    .map((division) => ({
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

  
  const userPart = await getUserExpensesDivisionPart(participantId);
  const members = await getMembersDivisions(groupId);
  return { group, userPaid, userPart, members };
}

async function getUserExpensesDivisionPart(participantId: number) {
  const divisionPart = true
  const result: ExpensesWithDivisions[] =
    await expenseRepository.getUserExpensesDivisionPart(participantId, divisionPart);
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
