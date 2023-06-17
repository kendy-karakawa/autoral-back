import { DivisionsParam } from "@/protocols";
import divisionRepository from "@/repositories/division-repository";

async function splitExpense({
  paidBy,
  totalValue,
  expenseId,
  participantsIds,
}: DivisionsParam) {
  const value = totalValue / participantsIds.length;
  const manyData: ManyDivisionType = participantsIds.map((item) => {
    if (item.id !== paidBy) {
      return { participantId: item.id, expenseId, value: value * -1 };
    } else {
      return {
        participantId: item.id,
        expenseId,
        value: value * (participantsIds.length - 1),
      };
    }
  });

  await divisionRepository.createDivisions(manyData);
}

export type ManyDivisionType = {
  participantId: number;
  expenseId: number;
  value: number;
}[];

const divisionService = {
  splitExpense,
};

export default divisionService;