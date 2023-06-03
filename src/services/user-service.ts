import { conflictError } from "@/errors"
import userRepository from "@/repositories/user-repository";

import { User } from "@prisma/client";
import bcrypt from 'bcrypt';


async function createUser ({name, email, phone, password}: CreateUserParams): Promise<User> {
    await validateEmail(email)

    const hashedPassword = await bcrypt.hash(password, 12);

    return userRepository.create({
        name,
        email,
        phone,
        password: hashedPassword
    })
}

async function validateEmail(email:string) {
    const emailAlreadyExist = await userRepository.findByEmail(email)
    if (emailAlreadyExist) throw conflictError('Email already exist')
}

export type CreateUserParams = Pick<User, 'name' | 'email' | 'phone' | 'password' >;

const userService = {
    createUser
}

export default userService