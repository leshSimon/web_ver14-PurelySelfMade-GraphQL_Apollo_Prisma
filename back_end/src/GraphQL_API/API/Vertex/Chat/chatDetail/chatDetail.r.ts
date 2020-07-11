import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  Query: {
    chatDetail: async (
      _: void,
      { chat_room_id, skip, take },
      { req, isAuthenticated }: any
    ) => {
      try {
        isAuthenticated(req);
        const result = await prisma.chat.findMany({
          where: {
            room: chat_room_id,
          },
          include: {
            user_chatTouser: true,
          },
          orderBy: { chat_id: "desc" },
          skip: skip ? skip : 0,
          take: take ? take : 4,
        });
        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};