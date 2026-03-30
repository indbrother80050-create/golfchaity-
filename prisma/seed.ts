import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const charities = [
    {
      name: "Green Earth Foundation",
      description: "Dedicated to reforestation and preserving natural golf landscapes worldwide.",
      website: "https://example.org/green-earth",
    },
    {
      name: "Junior Golf Initiative",
      description: "Providing equipment and coaching to underprivileged youth interested in golf.",
      website: "https://example.org/junior-golf",
    },
    {
      name: "Clean Water Project",
      description: "Ensuring sustainable water management for communities and courses.",
      website: "https://example.org/clean-water",
    },
  ];

  for (const charity of charities) {
    const exists = await prisma.charity.findFirst({ where: { name: charity.name } });
    if (!exists) {
      await prisma.charity.create({ data: charity });
    }
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
