import { notFoundError } from "@/errors";
import participantRepository from "@/repositories/participant-repository";

async function findAllUserGroup(userId: number) {
    const groups = await participantRepository.getGroupByUserId(userId)
    if(!groups) throw notFoundError()


    return groups
}

const groupService = {
    findAllUserGroup,
  };
  
  export default groupService;
  