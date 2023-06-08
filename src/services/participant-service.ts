import { forBiddenError, notFoundError } from "@/errors";
import participantRepository from "@/repositories/participant-repository";


async function getAcceptedStatus(userId: number, groupId: number) {
    const status = await participantRepository.getAcceptedStatus(userId, groupId)
    if (!status) throw notFoundError()
    return status
}

async function updateAcceptedStatus(userId: number, groupId: number, participantId:number) {
    await checkParticipantId(userId, groupId, participantId)
    return await participantRepository.updateAcceptedStatus(participantId)
}

async function checkParticipantId(userId: number, groupId: number, participantId:number) {
    const checkedParticipant = await participantRepository.checkParticipantId(userId, groupId)
    if (!checkedParticipant || checkedParticipant.id !== participantId) throw forBiddenError()
    return
}



const participantService = {
    getAcceptedStatus,
    updateAcceptedStatus
}

export default participantService