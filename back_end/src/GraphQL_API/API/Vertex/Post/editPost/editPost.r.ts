import { PrismaClient } from "@prisma/client";
import { rootPostDir } from "../../../../LibForGQL/findByPrisma/findRootDir";
import { EditPostMutationArgs } from "../../../../LibForGQL/mergedSchema/types/graph";
const prisma = new PrismaClient();

export default {
  Mutation: {
    editPost: async (
      _: void,
      args: EditPostMutationArgs,
      { req, isAuthenticated }: any
    ) => {
      isAuthenticated(req);
      const { post_id, caption, content, directory_id } = args;
      const { user } = req;
      let directory: any = null;
      try {
        directory_id === 0
          ? (directory = await rootPostDir(user.user_id))
          : (directory = directory_id);
      } catch (e) {
        console.log(e);
      }

      try {
        await prisma.post.update({
          data: {
            caption,
            content,
            directory_directoryTopost: {
              connect: { directory_id: directory },
            },
          },
          where: { post_id },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};