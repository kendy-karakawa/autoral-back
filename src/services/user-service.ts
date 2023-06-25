import { conflictError } from "@/errors"
import userRepository from "@/repositories/user-repository";

import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import groupService from "./group-service";


async function createUser ({name, email, phone, password}: CreateUserParams): Promise<User> {
    await validateEmail(email)
    console.log("cheguei")
    const hashedPassword = await bcrypt.hash(password, 12);

    return userRepository.create({
        name,
        email,
        phone,
        password: hashedPassword
    })
}

async function getUsersWithSearchTerm(searchTerm: string, userId: number, groupId: number) {
    const users = await userRepository.getUsersWithSearchTerm(searchTerm)
    return users
}

async function validateEmail(email:string) {
    const emailAlreadyExist = await userRepository.findByEmail(email)
    if (emailAlreadyExist) throw conflictError('Email already exist')
}

export type CreateUserParams = Pick<User, 'name' | 'email' | 'phone' | 'password' >;

const userService = {
    createUser,
    getUsersWithSearchTerm
}

export default userService