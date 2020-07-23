import React from "react";
import { MediaClock } from "../../../../../../../../GlobalLib/RecycleFunction/etc/Time";
import Buttons from "../St2Logics/Buttons";
import Initiate from "../St2Logics/Initiate";
import TimeNavigate from "../St2Logics/TimeNavigate";
import Volume from "../St2Logics/Volume";
import TimeAppointing from "../St2Logics/TimeAppointing";

export default ({
  audioDuration,
  audioPlayer,
  audioPlayBtn,
  audioVolumeBtn,
  audioVolumeBar,
  audioCurrentTime,
  audioEndTime,
  audioTimeBar,
  audioTimeBarContainer,
  audioBackToStartIcon,
  audioFrontMoveIcon,
  audioBackMoveIcon,
  audioBarHandle,
  audioTimeNavigation,
  audioTimeNavigateNumber,
  rerenderingPoint,
}: ReusingLogicProps) => {
  const getAudioCurrentTime = () => {
    if (audioPlayer && audioCurrentTime) {
      audioCurrentTime.textContent = MediaClock(
        Math.floor(audioPlayer.currentTime)
      );
    }
  };
  const statusBarMoving = () => {
    if (audioPlayer && audioTimeBar) {
      const progressRatio = audioPlayer.currentTime / audioDuration.current;
      audioTimeBar?.setAttribute("value", `${progressRatio}`);
      let HandleLocation = audioTimeBar?.clientWidth * progressRatio;
      if (HandleLocation < 4) {
        HandleLocation = 0;
      } else if (HandleLocation > audioTimeBar?.clientWidth - 5) {
        HandleLocation = audioTimeBar?.clientWidth - 9;
      } else {
        HandleLocation = HandleLocation - 4;
      }
      audioBarHandle.style.left = `${HandleLocation}px`;
    }
  };
  const audioGauge_x_axis = (e: any, viewNode: any, clickNode?: any) => {
    let x = 0;
    x = e.pageX - viewNode.getBoundingClientRect().left;
    x = x / (clickNode ? clickNode.clientWidth : viewNode.clientWidth);
    if (x > 1) {
      x = 1;
    }
    if (x < 0) {
      x = 0;
    }
    return x;
  };
  const audioSetTimeDenote = () => {
    getAudioCurrentTime();
    statusBarMoving();
  };

  return (
    <>
      <Initiate
        audioPlayer={audioPlayer}
        audioPlayBtn={audioPlayBtn}
        rerenderingPoint={rerenderingPoint}
        audioEndTime={audioEndTime}
        audioDuration={audioDuration}
        getAudioCurrentTime={getAudioCurrentTime}
        statusBarMoving={statusBarMoving}
      />
      <Buttons
        audioDuration={audioDuration}
        audioPlayer={audioPlayer}
        audioPlayBtn={audioPlayBtn}
        audioBackToStartIcon={audioBackToStartIcon}
        audioFrontMoveIcon={audioFrontMoveIcon}
        audioBackMoveIcon={audioBackMoveIcon}
        rerenderingPoint={rerenderingPoint}
        audioSetTimeDenote={audioSetTimeDenote}
      />
      <TimeNavigate
        audioDuration={audioDuration}
        audioCurrentTime={audioCurrentTime}
        audioTimeBar={audioTimeBar}
        audioTimeBarContainer={audioTimeBarContainer}
        audioTimeNavigation={audioTimeNavigation}
        audioTimeNavigateNumber={audioTimeNavigateNumber}
        audioGauge_x_axis={audioGauge_x_axis}
        rerenderingPoint={rerenderingPoint}
      />
      <TimeAppointing
        audioDuration={audioDuration}
        audioPlayer={audioPlayer}
        audioCurrentTime={audioCurrentTime}
        audioTimeBar={audioTimeBar}
        audioTimeBarContainer={audioTimeBarContainer}
        audioGauge_x_axis={audioGauge_x_axis}
        audioSetTimeDenote={audioSetTimeDenote}
        rerenderingPoint={rerenderingPoint}
      />
      <Volume
        audioPlayer={audioPlayer}
        audioVolumeBtn={audioVolumeBtn}
        audioVolumeBar={audioVolumeBar}
        audioGauge_x_axis={audioGauge_x_axis}
        rerenderingPoint={rerenderingPoint}
      />
    </>
  );
};
interface ReusingLogicProps {
  audioDuration: React.MutableRefObject<number>;
  audioPlayer: HTMLAudioElement;
  audioPlayBtn: HTMLElement;
  audioVolumeBtn: HTMLElement;
  audioVolumeBar: HTMLElement;
  audioCurrentTime: HTMLElement;
  audioEndTime: HTMLElement;
  audioTimeBar: HTMLElement;
  audioTimeBarContainer: HTMLElement;
  audioBackToStartIcon: HTMLElement;
  audioFrontMoveIcon: HTMLElement;
  audioBackMoveIcon: HTMLElement;
  audioBarHandle: HTMLElement;
  audioTimeNavigation: HTMLElement;
  audioTimeNavigateNumber: HTMLElement;
  rerenderingPoint?: any;
}