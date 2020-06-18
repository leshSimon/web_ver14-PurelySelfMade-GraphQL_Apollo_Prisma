import { PrismaClient } from "@prisma/client";
import { rootArchiveDir } from "../../../../LibForGQL/findRootDir";
const prisma = new PrismaClient();

export default {
  Mutation: {
    imgUpdate: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { image_id, caption, directory_id } = args;
      const { user } = request;
      let directory = null;
      try {
        if (directory_id === 0) {
          directory = await rootArchiveDir(user.user_id);
        } else {
          directory = directory_id;
        }
      } catch (e) {
        console.log(e);
      }

      try {
        await prisma.image.update({
          data: {
            caption,
            directory: {
              connect: { directory_id: directory },
            },
          },
          where: { image_id },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
