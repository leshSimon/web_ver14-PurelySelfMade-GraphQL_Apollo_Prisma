import { useState, useRef, useEffect } from "react";

export default (): useInfiniteScrollReturn => {
  const [List, setList] = useState([0, 1]);
  const OnlyOnce = useRef(true);
  const Finish = useRef(false);

  const LoadMore = () => {
    if (!Finish.current) {
      const getDocumentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const getScrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      if (getScrollTop + window.innerHeight + 50 > getDocumentHeight) {
        if (OnlyOnce.current) {
          setList((a) => {
            const newA = a.concat(a[a.length - 1] + 1);
            return newA;
          });
          OnlyOnce.current = false;
        }
      } else {
        OnlyOnce.current = true;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", LoadMore);
    return () => {
      window.removeEventListener("scroll", LoadMore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { List, Finish };
};

export interface useInfiniteScrollReturn {
  List: number[];
  Finish: React.MutableRefObject<boolean>;
}