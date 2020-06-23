import React from "react";
import styled from "styled-components";
import { saveSelection } from "../../../EditorLib";
import { spaped } from "../../../../../../GlobalLib/RecycleFunction/etc/StopAndPrevent";

const EdBtn = styled.div`
  display: flex;
  display: relative;
  width: 95px;
  height: 60px;
  margin: 0 5px 5px 0;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: white;
  &:hover {
    background-color: #dfe6e9;
  }
  cursor: pointer;
`;

type VideoInsertBtn = {
  CaretLocation: any;
  setAudioSubMenuOp: any;
};
export default ({ CaretLocation, setAudioSubMenuOp }: VideoInsertBtn) => {
  return (
    <EdBtn
      onMouseDown={(e) => {
        spaped(e);
        CaretLocation.current = saveSelection();
      }}
      onClick={(e) => {
        spaped(e);
        setAudioSubMenuOp(true);
      }}
    >
      <i className="icon-music" />
    </EdBtn>
  );
};