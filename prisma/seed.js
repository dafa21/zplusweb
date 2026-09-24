const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Password123*", 10);

  const user = await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {},
    create: {
      username: "superadmin",
      password: hashedPassword,
      name: "Superadmin",
    },
  });
  console.log("Created user:", user);
}

main();
