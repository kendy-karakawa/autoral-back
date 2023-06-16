import { forBiddenError, notFoundError } from "@/errors";
import { ManyParticipantsData, ParticipantsIds, UserArray } from "@/protocols";
import participantRepository from "@/repositories/participant-repository";

async function getGroupParticipants(userId: number, groupId: number) {
  const IsUserParticipantOfTheGroup =
    await participantRepository.checkParticipant(userId, groupId);
  if (!IsUserParticipantOfTheGroup) throw forBiddenError();

  const participants = await participantRepository.getParticipantsByGroupId(
    groupId
  );
  if (!participants) throw notFoundError();
  return participants;
}

async function updateAcceptedStatus(
  userId: number,
  groupId: number,
  participantId: number
) {
  await checkParticipantId(userId, groupId, participantId);
  return await participantRepository.updateAcceptedStatus(participantId);
}

async function deleteParticipant(
  userId: number,
  groupId: number,
  participantId: number
) {
  await checkParticipantId(userId, groupId, participantId);
  return await participantRepository.deleteParticipant(participantId);
}

async function checkParticipantId(
  userId: number,
  groupId: number,
  participantId: number
) {
  const checkedParticipant = await participantRepository.checkParticipant(
    userId,
    groupId
  );
  if (!checkedParticipant || checkedParticipant.id !== participantId)
    throw forBiddenError();
  return;
}

async function getParticipantId(userId: number, groupId: number) {
  const participant = await participantRepository.checkParticipant(
    userId,
    groupId
  );
  if (!participant) throw forBiddenError();
  return participant.id;
}

async function cretaeParticipants(
  userId: number,
  groupId: number,
  participantsId: UserArray
) {
  const data: ManyParticipantsData = participantsId.map((item) => ({
    userId: item.id,
    groupId,
  }));
  return await participantRepository.createMany(data);
}

async function checkParticipantsAreFromThisGroup(
  groupId: number,
  participantsIds: ParticipantsIds
) {
  for (const item of participantsIds) {
    try {
      const check = await participantRepository.checkParticipantById(
        item.id,
        groupId
      );
      if (!check) {
        throw new Error();
      }
    } catch (error) {
      throw forBiddenError();
    }
  }
}

const participantService = {
  getGroupParticipants,
  updateAcceptedStatus,
  deleteParticipant,
  cretaeParticipants,
  getParticipantId,
  checkParticipantsAreFromThisGroup,
};

export default participantService;
