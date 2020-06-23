import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const IMG_GET = gql`
  query imgGet($skip: Int, $take: Int) {
    imgGet(skip: $skip, take: $take) {
      image_id
      address
      caption
    }
  }
`;
export const ImgGetUpToN = (skip?: number, take?: number) =>
  useQuery(IMG_GET, {
    variables: { skip, take },
  });