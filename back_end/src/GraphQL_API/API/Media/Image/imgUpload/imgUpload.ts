import { PrismaClient } from "@prisma/client";
import { rootArchiveDir } from "../../../../LibForGQL/findRootDir";
const prisma = new PrismaClient();

interface imgUploadArgsTypes {
  address: string[];
  caption: string[];
  volume: number[];
  directory_id: number[];
  type: string[];
}
export default {
  Mutation: {
    imgUpload: async (
      _: null,
      args: imgUploadArgsTypes,
      { request, isAuthenticated }: any
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const { address, caption, volume, directory_id, type } = args;

      try {
        const RootDir = await rootArchiveDir(user.user_id);
        for (let i = 0; i < address.length; i++) {
          if (directory_id[i] === 0) {
            await prisma.image.create({
              data: {
                address: address[i],
                caption: caption[i],
                type: type[i],
                volume: volume[i],
                directory_directoryToimage: {
                  connect: { directory_id: RootDir },
                },
              },
            });
          } else {
            await prisma.image.create({
              data: {
                address: address[i],
                caption: caption[i],
                type: type[i],
                volume: volume[i],
                directory_directoryToimage: {
                  connect: { directory_id: directory_id[i] },
                },
              },
            });
          }
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};