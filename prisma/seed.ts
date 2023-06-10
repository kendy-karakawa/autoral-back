import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        phone: "11999999999",
      },
    ],
  });
  console.log("Seed complete");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
