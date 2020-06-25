import { PrismaClient } from "@prisma/client";
import { rootPostDir } from "../../../LibForGQL/findByPrisma/findRootDir";
import { UpdateDirMutationArgs } from "../../../LibForGQL/mergedSchema/types/graph";
const prisma = new PrismaClient();

export default {
  Mutation: {
    updateDir: async (
      _: void,
      args: UpdateDirMutationArgs,
      { request, isAuthenticated }: any
    ) => {
      isAuthenticated(request);
      const { directory_id, name, parent_id } = args;
      const { user } = request;
      let Belong: any = null;
      let contradictory_situation = false;
      try {
        if (parent_id === 0) {
          Belong = await rootPostDir(user.user_id);
        } else if (directory_id === parent_id) {
          contradictory_situation = true;
        } else {
          Belong = parent_id;
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: e.message,
        };
      }

      try {
        if (contradictory_situation) {
          await prisma.directory.update({
            data: { name },
            where: { directory_id },
          });
        } else {
          await prisma.directory.update({
            data: {
              name,
              directory: {
                connect: { directory_id: Belong },
              },
            },
            where: { directory_id },
          });
        }
        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
