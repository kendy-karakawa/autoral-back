import { DivisionsParam } from "@/protocols";
import divisionRepository from "@/repositories/division-repository";

async function splitExpenseWhenUserIsPartOfDivision({
  paidBy,
  totalValue,
  expenseId,
  participantsIds,
}: DivisionsParam) {
  const value = totalValue / participantsIds.length;
  const manyData: ManyDivisionType = participantsIds.map((item) => {
    if (item.id === paidBy) {
      return {
        participantId: item.id,
        expenseId,
        value: value * (participantsIds.length - 1),
      };
    } else {
      return { participantId: item.id, expenseId, value: value * -1 };
    }
  });

  await divisionRepository.createDivisions(manyData);
}

async function splitExpenseWhenUserIsNotPartOfDivision({
  paidBy,
  totalValue,
  expenseId,
  participantsIds,
}: DivisionsParam) {
  const value = totalValue / participantsIds.length;

  const manyData: ManyDivisionType = participantsIds.map((item) => {
    return { participantId: item.id, expenseId, value: value * -1 };
  });

  manyData.push({participantId: paidBy, expenseId, value: totalValue})

  await divisionRepository.createDivisions(manyData);
}

export type ManyDivisionType = {
  participantId: number;
  expenseId: number;
  value: number;
}[];

const divisionService = {
  splitExpenseWhenUserIsPartOfDivision,
  splitExpenseWhenUserIsNotPartOfDivision
};

export default divisionService;
