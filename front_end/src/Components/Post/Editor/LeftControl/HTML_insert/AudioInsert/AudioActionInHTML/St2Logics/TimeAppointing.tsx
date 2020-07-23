import React, { useEffect } from "react";
import styled from "styled-components";

const UnnecessaryDiv = styled.div`
  display: none;
`;

export default ({
  audioDuration,
  audioPlayer,
  audioCurrentTime,
  audioTimeBar,
  audioTimeBarContainer,
  audioGauge_x_axis,
  audioSetTimeDenote,
  rerenderingPoint,
}: St2AudioActionLogicProps) => {
  const audioCurrentTimeControlMouseMove = (e: any) => {
    if (audioPlayer && audioCurrentTime) {
      const movedValue = audioGauge_x_axis(
        e,
        audioTimeBar,
        audioTimeBarContainer
      );
      audioPlayer.currentTime = movedValue * audioDuration.current;
      audioSetTimeDenote();
    }
  };
  const audioCurrentTimeControlMouseDown = (e: any) => {
    if (e.button === 0) {
      audioCurrentTimeControlMouseMove(e);
      document.addEventListener("mousemove", audioCurrentTimeControlMouseMove);
    }
  };
  const audioCurrentTimeControlMouseUp = (e: any) => {
    if (e.button === 0) {
      document.removeEventListener(
        "mousemove",
        audioCurrentTimeControlMouseMove
      );
    }
  };

  useEffect(() => {
    audioTimeBarContainer?.addEventListener(
      "mousedown",
      audioCurrentTimeControlMouseDown
    );
    document?.addEventListener("mouseup", audioCurrentTimeControlMouseUp);

    return () => {
      audioTimeBarContainer?.removeEventListener(
        "mousedown",
        audioCurrentTimeControlMouseDown
      );
      document?.removeEventListener("mouseup", audioCurrentTimeControlMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderingPoint]);
  return <UnnecessaryDiv />;
};
interface St2AudioActionLogicProps {
  audioDuration: React.MutableRefObject<number>;
  audioPlayer: HTMLAudioElement;
  audioCurrentTime: HTMLElement;
  audioTimeBar: HTMLElement;
  audioTimeBarContainer: HTMLElement;
  audioGauge_x_axis: any;
  audioSetTimeDenote: any;
  rerenderingPoint?: any;
}