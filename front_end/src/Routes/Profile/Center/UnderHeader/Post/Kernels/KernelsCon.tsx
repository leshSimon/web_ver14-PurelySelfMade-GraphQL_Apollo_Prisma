import React, { useEffect } from "react";
import KernelsPre from "./KernelsPre";
import { PostsByDirIdRequest } from "../../../../../../GlobalLib/Apollo/GraphQL_Client/Post/PostRseries/PostByDirId";
import { useMyInfo } from "../../../../../../GlobalLib/Context/UserContext/Me";
import { S_N_to_N } from "../../../../../../GlobalLib/RecycleFunction/etc/type_convert";
import { useProfileDetailMode } from "../../../../../../GlobalLib/Context/ProfileContext/PfDetailMode";
import { useDirMode } from "../../../../../../GlobalLib/Context/ProfileContext/DirMode";
import { CountPostByDirIdRequest } from "../../../../../../GlobalLib/Apollo/GraphQL_Client/Post/PostCount/PostCount";

export default () => {
  const {
    MEdata: { user_id },
  } = useMyInfo();
  const PfDM = useProfileDetailMode();
  const { Location } = useDirMode();
  const { data, loading } = PostsByDirIdRequest(
    S_N_to_N(user_id),
    Location,
    PfDM.Mode,
    (PfDM.CurrentPostPage - 1) * PfDM.PostOneTimeShow,
    PfDM.CurrentPostPage * PfDM.PostOneTimeShow
  );
  const { data: WpcData, loading: WpcLoading } = CountPostByDirIdRequest(
    S_N_to_N(user_id),
    Location
  );

  useEffect(() => {
    if (WpcData) {
      PfDM.setTotalPostCount(WpcData.countPostByDirId);
      PfDM.setCurrentPostPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WpcData, Location]);

  return (
    <KernelsPre data={data?.postsByDirId} loading={loading || WpcLoading} />
  );
};
