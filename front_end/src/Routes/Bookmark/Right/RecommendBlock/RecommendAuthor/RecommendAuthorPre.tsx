import React from "react";
import styled from "styled-components";
import WH100per, {
  W100per,
} from "../../../../../GlobalLib/Styles/IteratePattern/WH100per";
import Avatar from "../../../../../Components/User/Avatar";

const RecommendBlock = styled.div`
  display: grid;
  grid-template-rows: 21px 1fr;
  margin: 0 0 10px 10px;
  width: 250px;
`;
const RecommendAuthor = styled(RecommendBlock)`
  min-height: 40px;
`;
const RSubSbj = styled(W100per)`
  display: grid;
  justify-content: right;
  padding: 0 5px 0 0;
  font-size: 0.85rem;
  border-bottom: 1px solid #b2bec3;
`;
const Lists = styled(W100per)`
  display: flex;
  flex-direction: column;
`;
const Rectangle = styled(W100per)`
  display: grid;
  grid-template-columns: 50px 1fr;
  height: 50px;
  margin: 5px 0 1px 0;
  padding: 0 3px 0 0;
  &:hover {
    border-right: 3px solid #636e72;
    padding: 0 0 0 0;
  }
  cursor: pointer;
`;
const Author = styled(WH100per)`
  display: grid;
  grid-template-rows: 1fr 25px;
`;
const AuthorName = styled(WH100per)`
  padding: 5px;
  font-size: 0.9rem;
`;

export default () => {
  return (
    <RecommendAuthor>
      <RSubSbj>Author</RSubSbj>
      <Lists>
        {!true &&
          [].map((rc: any) => (
            <Rectangle key={rc.post_id}>
              <Avatar size={50} />
              <Author>
                <AuthorName>{rc.caption}</AuthorName>
              </Author>
            </Rectangle>
          ))}
      </Lists>
    </RecommendAuthor>
  );
};