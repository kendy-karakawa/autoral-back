import { prisma } from "@/config";
import { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import { createUser } from "./factories";

export async function cleanDb() {
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.groups.deleteMany({});
  await prisma.participants.deleteMany({});
  await prisma.expenses.deleteMany({});
  await prisma.divisions.deleteMany({});
  await prisma.debts.deleteMany({});
}

// export async function generateValidToken(user?: User) {
//     const incomingUser = user;
//     const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
//     await createSession(token);
  
//     return token;
//   }