import { PrismaClient } from "@prisma/client";
import { usersData, ingredientsData } from "./data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: usersData,
    });
    console.log("Added users data");

    await prisma.ingredients.createMany({
      data: ingredientsData,
    });

    console.log("Added ingredients data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
