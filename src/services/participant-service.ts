import { forBiddenError, notFoundError } from "@/errors";
import participantRepository from "@/repositories/participant-repository";


async function getGroupParticipants(userId: number, groupId: number) {
    const IsUserParticipantOfTheGroup = await participantRepository.checkParticipant(userId, groupId)
    if(!IsUserParticipantOfTheGroup) throw forBiddenError()

    const participants = await participantRepository.getParticipantsByGroupId(groupId)
    if (!participants) throw notFoundError()
    return participants
}

async function updateAcceptedStatus(userId: number, groupId: number, participantId:number) {
    await checkParticipantId(userId, groupId, participantId)
    return await participantRepository.updateAcceptedStatus(participantId)
}

async function deleteParticipant(userId: number, groupId: number, participantId:number) {
    await checkParticipantId(userId, groupId, participantId)
    return await participantRepository.deleteParticipant(participantId)
}

async function checkParticipantId(userId: number, groupId: number, participantId:number) {
    const checkedParticipant = await participantRepository.checkParticipant(userId, groupId)
    if (!checkedParticipant || checkedParticipant.id !== participantId) throw forBiddenError()
    return
}



const participantService = {
    getGroupParticipants,
    updateAcceptedStatus,
    deleteParticipant
}

export default participantService