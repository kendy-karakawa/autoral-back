import { notFoundError } from "@/errors";
import participantRepository from "@/repositories/participant-repository";

async function getAcceptedStatus(userId: number, groupId: number) {
    const status = await participantRepository.getAcceptedStatus(userId, groupId)
    if (!status) throw notFoundError()
    return status
}


const participantService = {
    getAcceptedStatus
}

export default participantService