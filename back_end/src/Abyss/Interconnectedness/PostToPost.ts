import { PrismaClient } from "@prisma/client";
import {
  interestFade,
  relevanceSigmoid,
  relevanceSigmoidInverse,
  IntMemorySize,
} from "../AbyssLib/formula";
import { GeoMean } from "../../GlobalLib/recycleFunction/Arithmetic";

const prisma = new PrismaClient();

export const PostInterconnection = async (
  user_id: number,
  post_id: number,
  latest: Latest
) => {
  const old = await prisma.watched.findMany({
    where: {
      user: user_id,
      deprecated: 0,
    },
    select: {
      post: true,
      interest: true,
    },
    orderBy: {
      watched_id: "desc",
    },
    take: 4,
  });
  for (let i = 1; i < old.length; i++) {
    if (old[i].post !== post_id) {
      let exiCheck: any = await prisma.post_relevance.findMany({
        where: {
          OR: [
            {
              post1: old[i].post,
              post2: post_id,
            },
            {
              post1: post_id,
              post2: old[i].post,
            },
          ],
        },
        select: {
          post_relevance_id: true,
          degree: true,
        },
      });
      if (exiCheck.length !== 0) {
        exiCheck = exiCheck[0];
        await prisma.post_relevance.update({
          where: {
            post_relevance_id: exiCheck.post_relevance_id,
          },
          data: {
            degree:
              exiCheck.degree > 64999
                ? 65000
                : relevanceSigmoid(
                    (relevanceSigmoidInverse(exiCheck.degree, "post") *
                      IntMemorySize +
                      GeoMean(
                        interestFade(old[i].interest, i),
                        latest.interest
                      )) /
                      IntMemorySize,
                    "post"
                  ),
          },
        });
      } else {
        await prisma.post_relevance.create({
          data: {
            post_postTopost_relevance_post1: {
              connect: {
                post_id,
              },
            },
            post_postTopost_relevance_post2: {
              connect: {
                post_id: old[i].post,
              },
            },
            degree: relevanceSigmoid(
              GeoMean(interestFade(old[i].interest, i), latest.interest) /
                IntMemorySize,
              "post"
            ),
          },
        });
      }
    }
  }
};

interface Latest {
  interest: number;
}
