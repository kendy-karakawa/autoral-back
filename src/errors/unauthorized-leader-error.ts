import { ApplicationError } from '@/protocols';

export function unauthorizedLeaderError(): ApplicationError {
  return {
    name: 'UnauthorizedleaderError',
    message: 'You are not the leader',
  };
}
