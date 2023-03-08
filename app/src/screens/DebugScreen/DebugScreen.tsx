import "./DebugScreen.css";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { For, reactive } from "@legendapp/state/react";
import AppLogo from "@assets/svg/app_logo.svg";
import { observable } from "@legendapp/state";

const HEX_EDGE = 166;
const HEX_HEIGHT = HEX_EDGE * 2;
const HEX_WIDTH = Math.sqrt(3) * HEX_EDGE;
const HEX_MARGIN = 20;
const HEX_CONTAINER_HEIGHT = HEX_HEIGHT * 0.75;

const MotionDiv = reactive(motion.div);
const deltaScroll = 1 / Math.tan(Math.PI / 3);

type ItemProps = {
  containerRef: RefObject<HTMLDivElement>;
};

function Item({ containerRef }: ItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const translateX = useMotionValue<string | undefined>(undefined);

  const updateTranslateX = useCallback(() => {
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    translateX.set(`${(window.innerHeight - top) * deltaScroll}px`);
  }, [translateX]);

  const isIntersect = () => {
    const bottom = ref.current?.getBoundingClientRect().bottom;
    const top = ref.current?.getBoundingClientRect().top;

    if (bottom === undefined || bottom < 0) {
      return false;
    }
    if (top === undefined || top > window.innerHeight) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (isIntersect()) {
      updateTranslateX();
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (isIntersect()) {
        updateTranslateX();
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [containerRef, translateX, updateTranslateX]);

  return (
    <div
      style={{
        flexBasis: HEX_WIDTH,
        height: HEX_CONTAINER_HEIGHT,
        scrollSnapAlign: "center",
        backgroundColor: 'red',
        border: '1px solid black'
      }}
    >
      <MotionDiv ref={ref} style={{ translate: translateX }}>
        <motion.img
          src={AppLogo}
          height={HEX_HEIGHT}
          width={HEX_WIDTH}
          whileHover={{ scale: 1.05 }}
          style={{
            clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
            padding: 2,
          }}
        />
      </MotionDiv>
    </div>
  );
}

const items = observable(Array.from({ length: 99 }, (_, index) => ({ id: index })));
export default function DebugScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div ref={containerRef} style={{ position: "fixed", width: "100vw", height: "100vh", overflow: "auto" }}>
      <motion.div
        style={{
          width: "70vw",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: HEX_MARGIN,
          paddingTop: `calc(50vh - ${HEX_EDGE}px)`,
          paddingBottom: `calc(50vh - ${HEX_CONTAINER_HEIGHT}px)`,
        }}
      >
        <For each={items} optimized>
          {(item) => {
            return <Item containerRef={containerRef} />;
          }}
        </For>
      </motion.div>
    </motion.div>
  );
}
