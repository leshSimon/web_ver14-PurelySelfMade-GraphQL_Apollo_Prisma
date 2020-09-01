import React from "react";
import styled from "styled-components";
import { W100per } from "../../../../../../GlobalLib/Styles/IteratePattern/WH100per";
import { byteIntoUnit } from "../../../../../../GlobalLib/RecycleFunction/etc/Math/Arithmetic";
import PagenationCon from "../../Pagenation/PagenationCon";

const Circumstance = styled(W100per)`
  padding: 16px 0 16px 0;
`;
const CountAndVol = styled(W100per)`
  padding: 10px 5px 0 6px;
`;

export default ({ data: { musics } }: MusicProps) => {
  return (
    <>
      <Circumstance>
        <i className="icon-music" /> Music
        <CountAndVol>
          count: {musics.count} &nbsp; volume:{" "}
          {byteIntoUnit(musics.volume).number}{" "}
          {byteIntoUnit(musics.volume).unit}
        </CountAndVol>
      </Circumstance>
      <Circumstance>
        <PagenationCon />
      </Circumstance>
      <Circumstance>선택모드, 추가</Circumstance>
    </>
  );
};

interface MusicProps {
  data: any;
}
