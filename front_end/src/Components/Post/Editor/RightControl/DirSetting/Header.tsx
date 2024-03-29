import React from "react";
import styled from "styled-components";
import { useDirMode } from "../../../../../GlobalLib/Context/ProfileContext/DirMode";
import HeadRootSbj from "../../../../../Routes/OnlyForMember/Profile/RightPanel/Section/HeadRootSbj";
import { spaped } from "../../../../../GlobalLib/RecycleFunction/etc/StopAndPrevent";

const SbJCon = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 40px;
  align-items: center;
`;
const SbJ = styled.div`
  display: grid;
  align-items: center;
  padding: 0 0 0 10px;
  width: 100%;
  height: 100%;
  font-size: 1.3rem;
  overflow: hidden;
`;
const SbJCon2 = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  width: 100%;
  height: 40px;
  align-items: center;
`;
const BackStep = styled.div`
  display: grid;
  justify-content: center;
  padding: 11px;
  font-size: 1rem;
  height: 100%;
  width: 100%;
  &:hover {
    background-color: rgba(178, 190, 195, 0.5);
  }
  cursor: pointer;
`;

export default () => {
  const { DirData, setLocation } = useDirMode();
  return (
    <>
      {DirData?.root ? (
        <SbJCon>
          <HeadRootSbj />
        </SbJCon>
      ) : (
        <SbJCon2>
          <BackStep
            onClick={async (e) => {
              spaped(e);
              if (!DirData?.directory?.root) {
                setLocation(parseInt(DirData?.parent_id));
              } else {
                setLocation(0);
              }
            }}
          >
            <i className="icon-left-big" />
          </BackStep>
          <SbJ>{DirData?.name}</SbJ>
        </SbJCon2>
      )}
    </>
  );
};
