import { prisma } from '@/config';
import { CreateUserParams } from '@/services';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';


export async function createUser(params: CreateUserParams): Promise<User> {
    const incomingPassword = params.password || faker.internet.password(6); 
    const hashedPassword = await bcrypt.hash(incomingPassword, 12);

    const data = {...params, password: hashedPassword}
    return prisma.user.create({
        data,
    })
}




