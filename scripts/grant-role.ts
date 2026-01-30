import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import prismaConfig from '../prisma.config';

const adapter = new PrismaPg({
  connectionString: prismaConfig.datasource?.url,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = process.argv[2];
  const role = process.argv[3];

  const user = await prisma.user.update({
    data: {
      roles: {
        connect: {
          name: role,
        },
      },
    },
    where: {
      email,
    },
    select: { id: true },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
