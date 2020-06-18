import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../../../GlobalLib/utils";
const prisma = new PrismaClient();

export default {
  Mutation: {
    loginUser: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await prisma.user.findOne({ where: { email } });
        if (user !== null) {
          if (password === user.password) {
            return generateToken(user.user_id);
          } else {
            return "WorngPW";
          }
        } else {
          return "emailNotExist";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
