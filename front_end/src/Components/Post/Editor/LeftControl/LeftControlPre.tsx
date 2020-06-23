import React from "react";
import styled, { css } from "styled-components";
import HiddenScreen from "./ToggleScreen/HiddenScreenCon";
import BtnCollection from "./ButtonPart/BtnCollection";
import { spaped } from "../../../../GlobalLib/RecycleFunction/etc/StopAndPrevent";

interface ControlsLProp {
  FcOpen: boolean;
}
const ControlsL = styled.div<ControlsLProp>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  ${(prop) => {
    if (prop.FcOpen) {
      return css`
        top: 55px;
      `;
    } else {
      return css`
        top: 70px;
      `;
    }
  }}
  left: -220px;
  width: 200px;
  z-index: 11;
`;

export default ({
  FcOpen,
  setFcOpen,
  ColorPiked,
  setColorPiked,
  IroColor,
  CaretLocation,
  AnchorInputOpen,
  setAnchorInputOpen,
  URLText,
  VideoURLText,
  ImgSubMenuOp,
  setImgSubMenuOp,
  VideoSubMenuOp,
  setVideoSubMenuOp,
  AudioSubMenuOp,
  setAudioSubMenuOp,
}: LeftControlPreProps) => {
  return (
    <>
      <ControlsL
        FcOpen={FcOpen}
        onMouseUp={(e) => {
          spaped(e);
          if (FcOpen) {
            setColorPiked(IroColor.current.color.rgbString);
          }
        }}
      >
        <BtnCollection
          FcOpen={FcOpen}
          setFcOpen={setFcOpen}
          ColorPiked={ColorPiked}
          CaretLocation={CaretLocation}
          setAnchorInputOpen={setAnchorInputOpen}
          setImgSubMenuOp={setImgSubMenuOp}
          setVideoSubMenuOp={setVideoSubMenuOp}
          setAudioSubMenuOp={setAudioSubMenuOp}
        />
      </ControlsL>
      <HiddenScreen
        CaretLocation={CaretLocation}
        AnchorInputOpen={AnchorInputOpen}
        setAnchorInputOpen={setAnchorInputOpen}
        URLText={URLText}
        VideoURLText={VideoURLText}
        ImgSubMenuOp={ImgSubMenuOp}
        setImgSubMenuOp={setImgSubMenuOp}
        VideoSubMenuOp={VideoSubMenuOp}
        setVideoSubMenuOp={setVideoSubMenuOp}
        AudioSubMenuOp={AudioSubMenuOp}
        setAudioSubMenuOp={setAudioSubMenuOp}
      />
    </>
  );
};
type LeftControlPreProps = {
  FcOpen: boolean;
  setFcOpen: any;
  ColorPiked: any;
  setColorPiked: any;
  IroColor: any;
  CaretLocation: any;
  AnchorInputOpen: boolean;
  setAnchorInputOpen: any;
  URLText: any;
  VideoURLText: any;
  ImgSubMenuOp: boolean;
  setImgSubMenuOp: any;
  VideoSubMenuOp: boolean;
  setVideoSubMenuOp: any;
  AudioSubMenuOp: boolean;
  setAudioSubMenuOp: any;
};