import React, { useState } from "react";
import styled from "styled-components";
import { W100per } from "../../GlobalLib/Styles/IteratePattern/WH100per";
import BlogHeaderCon from "./BlogHeader/BlogHeaderCon";
import LoginModalCon from "../../Components/User/Auth/LoginModal/LoginModalCon";
import ProfileSectionCon from "./ProfileSection/ProfileSectionCon";
import Loading from "../../Components/Effect/Loading";
import DisplayCon from "./Display/DisplayCon";

const Compass = styled(W100per)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ({
  user_id,
  UserData,
  UserDataLoading,
  Mode,
  setMode,
}: BlogPreProps) => {
  const [LoginOpen, setLoginOpen] = useState(false);
  return (
    <Compass>
      {UserDataLoading ? (
        <Loading />
      ) : (
        <>
          <BlogHeaderCon setLoginOpen={setLoginOpen} />
          <ProfileSectionCon
            user_id={user_id}
            UserData={UserData}
            UserDataLoading={UserDataLoading}
            Mode={Mode}
            setMode={setMode}
          />
          <DisplayCon user_id={user_id} Mode={Mode} />
        </>
      )}
      {LoginOpen && (
        <LoginModalCon zIndex={30} setLoginModalOpen={setLoginOpen} />
      )}
    </Compass>
  );
};

interface BlogPreProps {
  user_id: number;
  UserData: any;
  UserDataLoading: boolean;
  Mode: string;
  setMode: any;
}