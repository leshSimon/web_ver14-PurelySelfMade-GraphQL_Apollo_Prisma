import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { S_N_to_N } from "../../../RecycleFunction/etc/type_convert";
import {
  SeePostAllRequest,
  SeeWhosePostsLazyRequest,
  SeeSearchPostsRequest,
} from "../../../Apollo/GraphQL_Client/Post/PostRseries/PostR";

const TargetsShown = createContext<TargetsShownContext | undefined>(undefined);
export const TargetsShownProvider = ({ children }: { children: ReactNode }) => {
  const [PostTargetMode, setPostTargetMode] = useState(
    "All"
  ); /*그 종류에는 
  All, Whose, Search 가 있다.*/
  const [Whose, setWhose] = useState(0);
  const [KeyWord, setKeyWord] = useState("");

  const [posts, setPosts] = useState(null);
  const [posts_loading, setPosts_loading] = useState(true);
  const [posts_refetch, setPosts_refetch]: any = useState(null);
  const { data, loading, refetch } = SeePostAllRequest();
  const [
    WsloadGreeting,
    { called: WsCalled, data: WsData, loading: WsLoading, refetch: WsRefetch },
  ] = SeeWhosePostsLazyRequest(S_N_to_N(Whose));
  const [
    SrloadGreeting,
    { called: SrCalled, data: SrData, loading: SrLoading, refetch: SrRefetch },
  ] = SeeSearchPostsRequest(KeyWord);

  useEffect(() => {
    if (PostTargetMode === "Whose") {
      setPosts(WsData?.seeWhosePosts);
      setPosts_loading(WsLoading);
      setPosts_refetch(() => WsRefetch);
    } else if (PostTargetMode === "Search") {
      setPosts(SrData?.searchPost);
      setPosts_loading(SrLoading);
      setPosts_refetch(() => SrRefetch);
    } else {
      setPosts(data?.seePosts);
      setPosts_loading(loading);
      setPosts_refetch(() => refetch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    PostTargetMode,
    WsLoading,
    SrLoading,
    loading,
    Whose,
    KeyWord,
    WsData,
    SrData,
    data,
    WsCalled,
    SrCalled,
  ]);

  useEffect(() => {
    if (posts_refetch) {
      posts_refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostTargetMode]);

  const Obj = {
    PostTargetMode,
    setPostTargetMode,
    Whose,
    setWhose,
    setKeyWord,
    posts,
    posts_loading,
    posts_refetch,
    WsloadGreeting,
    WsCalled,
    SrloadGreeting,
    SrCalled,
  };
  return <TargetsShown.Provider value={Obj}>{children}</TargetsShown.Provider>;
};
interface TargetsShownContext {
  PostTargetMode: string;
  setPostTargetMode: any;
  Whose: number | string;
  setWhose: any;
  setKeyWord: any;
  posts: any;
  posts_loading: any;
  posts_refetch: any;
  WsloadGreeting: any;
  WsCalled: boolean;
  SrloadGreeting: any;
  SrCalled: boolean;
}

export const useTargetsShown = () => {
  const state = useContext(TargetsShown);
  if (!state) throw new Error("TargetsShown not found");
  return state;
};
