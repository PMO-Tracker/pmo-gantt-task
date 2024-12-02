import React, { SyntheticEvent, useRef, useEffect } from "react";
import styles from "./horizontal-scroll.module.css";

export const HorizontalScroll: React.FC<{
  scroll: number;
  svgWidth: number;
  taskListWidth: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({
  scroll, 
  svgWidth, 
  onScroll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scroll;
    }
  }, [scroll]);
  return (
    <div style={{display:"flex"}}>
    <div
      dir="ltr"
      className={styles.scrollWrapper}
      onScroll={onScroll}
      ref={scrollRef}
      style = {{ flex:1 }}
    >
      <div style={{ width: svgWidth }} className={styles.scroll} />
    </div>
    </div>
  );
};
