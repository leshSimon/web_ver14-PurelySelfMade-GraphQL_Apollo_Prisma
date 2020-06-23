import { PrismaClient } from "@prisma/client";
import { MakeGroupMutationArgs } from "../../../LibForGQL/mergedSchema/types/graph";
const prisma = new PrismaClient();

export default {
  Mutation: {
    makeGroup: async (
      _: void,
      args: MakeGroupMutationArgs,
      { request, isAuthenticated }: any
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        name,
        purpose,
        participation_system,
        withdrawal_system,
        identiti_back_img,
        identiti_profile_img,
      } = args;
      try {
        await prisma.group.create({
          data: {
            name,
            purpose,
            user: {
              connect: { user_id: user.user_id },
            },
            participation_system,
            withdrawal_system,
            identiti_back_img,
            identiti_profile_img,
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
