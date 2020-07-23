import React, { useEffect } from "react";
import { MediaClock } from "../../../../../../../../GlobalLib/RecycleFunction/etc/Time";
import styled from "styled-components";

const UnnecessaryDiv = styled.div`
  display: none;
`;

export default ({
  audioDuration,
  audioCurrentTime,
  audioTimeBar,
  audioTimeBarContainer,
  audioTimeNavigation,
  audioTimeNavigateNumber,
  audioGauge_x_axis,
  rerenderingPoint,
}: St2AudioActionLogicProps) => {
  const audioTimeNavigate = (e: any) => {
    if (
      audioTimeNavigateNumber &&
      audioTimeBar &&
      audioTimeBarContainer &&
      audioTimeNavigation
    ) {
      const movedValue = audioGauge_x_axis(e, audioTimeBarContainer);
      const virtualTime = MediaClock(movedValue * audioDuration.current);
      audioTimeNavigateNumber.style.display = "flex";
      audioTimeNavigateNumber.textContent = virtualTime;

      const fullGapSize = audioCurrentTime.offsetWidth;
      const gapSize = fullGapSize - 9;
      const MousePosition =
        e.pageX - audioTimeNavigation.getBoundingClientRect().left;
      let x = 0;
      if (MousePosition < fullGapSize + gapSize / 2) {
        x = fullGapSize;
      } else if (
        MousePosition >
        audioTimeNavigation.clientWidth - gapSize / 2
      ) {
        x = audioTimeNavigation.clientWidth - gapSize;
      } else {
        x = MousePosition - gapSize / 2;
      }
      audioTimeNavigateNumber.style.left = `${x}px`;
    }
  };
  const audioTimeNavigateShow = (e: any) => {
    audioTimeNavigate(e);
    audioTimeBarContainer?.addEventListener("mousemove", audioTimeNavigate);
  };
  const audioTimeNavigateHide = () => {
    audioTimeNavigateNumber.style.display = "none";
    audioTimeBarContainer?.removeEventListener("mousemove", audioTimeNavigate);
  };

  useEffect(() => {
    audioTimeBarContainer?.addEventListener("mouseover", audioTimeNavigateShow);
    audioTimeBarContainer?.addEventListener("mouseout", audioTimeNavigateHide);

    return () => {
      audioTimeBarContainer?.removeEventListener(
        "mouseover",
        audioTimeNavigateShow
      );
      audioTimeBarContainer?.removeEventListener(
        "mouseout",
        audioTimeNavigateHide
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderingPoint]);
  return <UnnecessaryDiv />;
};

interface St2AudioActionLogicProps {
  audioDuration: React.MutableRefObject<number>;
  audioCurrentTime: HTMLElement;
  audioTimeBar: HTMLElement;
  audioTimeBarContainer: HTMLElement;
  audioTimeNavigation: HTMLElement;
  audioTimeNavigateNumber: HTMLElement;
  audioGauge_x_axis: any;
  rerenderingPoint?: any;
}