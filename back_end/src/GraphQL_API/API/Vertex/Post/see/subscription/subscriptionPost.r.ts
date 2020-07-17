import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  Query: {
    subscriptionPost: async (
      _: void,
      __: void,
      { req, isAuthenticated }: any
    ) => {
      isAuthenticated(req);
      const { user } = req;
      try {
        return prisma.post.findMany({
          where: {
            OR: [
              {
                user_postTouser: {
                  subscriber_subscriber_authorTouser: {
                    some: {
                      reader: user.user_id,
                    },
                  },
                },
              },
              {
                user: user.user_id,
              },
            ],
          },
          include: { user_postTouser: true },
          orderBy: { post_id: "desc" },
          take: 15,
        });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};
