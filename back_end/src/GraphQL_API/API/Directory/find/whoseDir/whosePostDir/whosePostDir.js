import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  Query: {
    whosePostDir: async (_, args) => {
      const { user_id } = args;
      try {
        const ret = await prisma.directory.findMany({
          where: {
            root: true,
            name: "My Post",
            user: { user_id },
          },
          include: {
            directory: {
              include: {
                directory: true,
              },
            },
            post: true,
          },
        });
        return ret[0];
      } catch (e) {
        console.log(e);
      }
    },
  },
};
