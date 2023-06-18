import { Expenses } from "@prisma/client";
import participantService from "./participant-service";
import expenseRepository from "@/repositories/expense-repository";
import divisionService from "./division-service";
import { DivisionsParam, ParticipantsIds } from "@/protocols";
import participantRepository from "@/repositories/participant-repository";

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
  //return await expenseRepository.getAllExpense(groupId)
  const result:getAllExpenseType[]  =  await expenseRepository.getAllExpense(groupId)
  const expenses =  await formatGetAllexpenseReturn(result)
  const numberOfGroupParticipants = await participantRepository.countGroupParticipantsWhenAceptIstrue(groupId)
  return {quantity: numberOfGroupParticipants, expenses}
}

async function formatGetAllexpenseReturn(originalList: getAllExpenseType[]) {
const transformedList = originalList.map((obj)=> ({
    expenseId:obj.id,
    name: obj.name,
    value: obj.value,
    createdAt: obj.createdAt,
    paidBy: {
      userId: obj.Participants.userId,
      name:obj.Participants.User.name,
      image: obj.Participants.User.image,
    },
    divisions: obj.Divisions.map(division =>({
      name:division.Participants.User.name
    }))

  }
))
  return transformedList
  
}

async function deleteExpense(userId: number, expenseId: number) {
  return await expenseRepository.deleteExpense(expenseId)
}

export type getAllExpenseType = {
  id: number,
  name: string,
  value: number,
  paidBy: number,
  groupId: number,
  createdAt: Date,
  updatedAt: Date,
  Participants: {
    id: number,
    userId: number,
    groupId: number,
    accepted: boolean,
    createdAt: Date,
    updatedAt: Date,
    User: {
      name: string,
      image: string
    }
  },
  Divisions: divisionsType[]
}

export type divisionsType = {
  id: number,
  value: number,
  participantId: number,
  expenseId: number,
  createdAt: Date,
  updatedAt: Date,
  Participants: {
    id: number,
    userId: number,
    groupId: number,
    accepted: boolean,
    createdAt: Date,
    updatedAt: Date,
    User: {
      name: string
    }
  }
}




export type createExpenseType = Pick<Expenses, "name" | "value" | "paidBy" | "groupId">;

const expenseService = {
  createExpense,
  getAllExpense,
  deleteExpense
};

export default expenseService;
