import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";
import path from "path";
import { assetsLocation } from "../../../../../../GlobalLib/assets/im_here";
import { MusicDeleteMutationArgs } from "../../../../../LibForGQL/mergedSchema/types/graph";

export default {
  Mutation: {
    musicDelete: async (
      _: null,
      args: MusicDeleteMutationArgs,
      { req, isAuthenticated }: any
    ) => {
      isAuthenticated(req);
      const { music_id } = args;
      try {
        interface fileThingType {
          address: string;
        }
        const fileThing: fileThingType | null = await prisma.music.delete({
          where: { music_id },
          select: { address: true },
        });
        fs.unlinkSync(
          path.join(
            assetsLocation() + "/uploadedFiles" + `/${fileThing.address}`
          )
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
