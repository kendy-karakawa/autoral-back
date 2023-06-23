import { Divisions, Expenses } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type UserArray = {
  id: number
}[]

export type ManyParticipantsData = {
  userId: number,
  groupId: number
}[]

export type ParticipantsIds = {
  id: number
}[]

export type DivisionsParam = {
  paidBy: number,
  totalValue: number,
  expenseId: number,
  participantsIds: ParticipantsIds
}

export type ExpensesWithDivisions = {
    id: number
    name: string
    value: number
    paidBy: number
    groupId: number
    createdAt: Date
    updatedAt: Date
    Divisions: Divisions[]
  
}

export type getAllExpenseType = {
  id: number;
  name: string;
  value: number;
  divisionPart: boolean;
  paidBy: number;
  groupId: number;
  createdAt: Date;
  updatedAt: Date;
  Participants: {
    id: number;
    userId: number;
    groupId: number;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    User: {
      name: string;
      image: string;
    };
  };
  Divisions: divisionsType[];
};

export type divisionsType = {
  id: number;
  value: number;
  participantId: number;
  expenseId: number;
  createdAt: Date;
  updatedAt: Date;
  Participants: {
    id: number;
    userId: number;
    groupId: number;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    User: {
      name: string;
    };
  };
};

export type createExpenseType = Pick<
  Expenses,
  "name" | "value" | "paidBy" | "groupId" | "divisionPart"
>;