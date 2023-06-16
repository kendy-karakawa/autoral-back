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
