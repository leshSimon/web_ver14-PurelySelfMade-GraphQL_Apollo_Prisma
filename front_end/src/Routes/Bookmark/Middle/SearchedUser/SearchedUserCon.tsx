import React from "react";
import SearchedUserPre from "./SearchedUserPre";
import { SEE_FRIENDS } from "../../../../GlobalLib/Apollo/GraphQL_Client/Relation/Friend/FriendR";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../../../GlobalLib/Apollo/GraphQL_Client/Relation/Friend/FriendCUD";

export default () => {
  const [addFriendMutation] = useMutation(ADD_FRIEND, {
    refetchQueries: () => [{ query: SEE_FRIENDS }],
  });
  const addFriend = (partner: number) => {
    try {
      addFriendMutation({
        variables: {
          respondent: partner,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <SearchedUserPre addFriend={addFriend} />;
};
