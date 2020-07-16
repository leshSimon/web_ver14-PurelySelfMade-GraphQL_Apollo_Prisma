import React, { useState } from "react";
import LeftSideMenuPresenter from "./LeftSideMenuPre";
import { useMutation } from "@apollo/client";
import { LOCAL_LOG_OUT } from "../../../GlobalLib/Apollo/LocalState/auth/authQuery";

export default () => {
  const [MoreMenu, setMoreMenu] = useState(false);
  const [localLogOutMutation] = useMutation(LOCAL_LOG_OUT);
  return (
    <LeftSideMenuPresenter
      MoreMenu={MoreMenu}
      setMoreMenu={setMoreMenu}
      localLogOutMutation={localLogOutMutation}
    />
  );
};
