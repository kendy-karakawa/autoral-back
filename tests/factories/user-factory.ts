import { prisma } from '@/config';
import { CreateUserParams } from '@/services';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export async function createUser(data: CreateUserParams): Promise<User> {
    return prisma.user.create({
        data,
    })
}