import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

export const FIND_MY_POST_DIR = gql`
  query findMyPostDir($directory_id: Int!) {
    findMyPostDir(directory_id: $directory_id) {
      directory_id
      name
      parent_id {
        directory_id
      }
      root
      directory {
        directory_id
        name
      }
      post {
        post_id
        caption
      }
    }
  }
`;
export const FindMyPostDirRequest = (directory_id: number) =>
  useLazyQuery(FIND_MY_POST_DIR, {
    variables: { directory_id },
  });

export const FIND_MY_ARCHIVE_DIR = gql`
  query findMyArchiveDir($directory_id: Int!) {
    findMyArchiveDir(directory_id: $directory_id) {
      directory_id
      name
      parent_id {
        directory_id
      }
      root
      directory {
        directory_id
        name
      }
      image {
        image_id
        caption
        address
      }
      video {
        video_id
        caption
        address
      }
      music {
        music_id
        caption
        address
      }
    }
  }
`;
export const FindMyArchiveDirRequest = (directory_id: number) =>
  useLazyQuery(FIND_MY_ARCHIVE_DIR, {
    variables: { directory_id },
    partialRefetch: true,
  });

export const WHOSE_POST_DIR = gql`
  query whosePostDir($user_id: Int!) {
    whosePostDir(user_id: $user_id) {
      directory_id
      name
      root
      directory {
        directory_id
        name
        directory {
          directory_id
        }
      }
      post {
        post_id
        caption
        content
      }
    }
  }
`;
export const WhosePostDirRequest = (user_id: number) =>
  useQuery(WHOSE_POST_DIR, {
    variables: { user_id },
  });

export const FIND_DIR_BY_ID = gql`
  query findDirById($directory_id: Int!) {
    findDirById(directory_id: $directory_id) {
      directory_id
      name
      parent_id {
        directory_id
      }
      root
      directory {
        directory_id
        name
        directory {
          directory_id
        }
      }
      post {
        post_id
        caption
        content
      }
    }
  }
`;
export const FindDirByIdRequest = (directory_id: number) =>
  useQuery(FIND_DIR_BY_ID, {
    variables: { directory_id },
  });
