import { invalidCredentialsError } from "@/errors";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(email: string, password: string): Promise<SigInResult> {
  const user = await getUserOrErro(email);
  await validatePasswordOrErro(password, user.password);
  const token = await createSession(user.id);
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    token,
  };
}

async function getUserOrErro(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
  return user;
}

async function validatePasswordOrErro(password: string, useerPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, useerPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.createSession({ token, userId });
  return token;
}

type GetUserOrFailResult = Pick<
  User,
  "id" | "name" | "phone" | "email" | "password"
>;

type SigInResult = {
  id: number;
  name: string;
  phone: string;
  email: string;
  token: string;
};

const authenticationService = {
  signIn,
};

export default authenticationService;
