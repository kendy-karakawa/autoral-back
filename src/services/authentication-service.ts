import { invalidCredentialsError } from "@/errors";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(email: string, password: string): Promise<SigInResult> {
  console.log(`Entrei no service e recebi email:${email}, senha: ${password} vou checar o user`)
  const user = await getUserOrErro(email);
  console.log(`o usuario existe e vou checar a senha`)
  await validatePasswordOrErro(password, user.password);
  console.log(`Passei pela verificação de senha e vou criar a sessao`)
  const token = await createSession(user.id);
  console.log(`recebi o token e vou retornar os dados`)
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    image: user.image,
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
  console.log(`entrei na função para criar a seção, e vou criar o token`)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  console.log(`Criei o token jwt: ${token} e vou criar a seção no banco`)
  await sessionRepository.createSession({ token, userId });
  console.log(`Criei a sessao e vou retornar o token`)
  return token;
}

type GetUserOrFailResult = Pick<
  User,
  "id" | "name" | "phone" | "email" | "password" | "image"
>;

type SigInResult = {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: string;
  token: string;
};

const authenticationService = {
  signIn,
};

export default authenticationService;
