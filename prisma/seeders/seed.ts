import { PrismaClient } from '../lib/generated/prisma';

import { BLOG_POSTS } from './data';

const prisma = new PrismaClient();

const main = async () => {
  console.log('\nStart seeding records into database...\n');

  for (const post of BLOG_POSTS) {
    const result = await prisma.post.create({
      data: post,
    });

    console.log(`Created blog post with ID: ${result.id}`);
  }

  console.log('\nFinished seeding records...');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });
