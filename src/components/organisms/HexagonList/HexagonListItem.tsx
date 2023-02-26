import { Observable } from "@legendapp/state";
import { motion, useMotionValue } from "framer-motion";
import { ReactElement, RefObject, useCallback, useEffect, useRef } from "react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { Text } from "@atoms/Text";

/**
 * Usefull to compute coordinate x from coordinate y in trigonometry
 * It works specifically to translate along a 60° diagonal axe
 */
const deltaScroll = 1 / Math.tan(Math.PI / 3);

export type RenderHexagonListItem<T> = (props: {
  containerRef: RefObject<HTMLDivElement>;
  item: Observable<T>;
  shape: Hexagon;
}) => ReactElement;

type Props<T> = {
  containerRef: RefObject<HTMLDivElement>;
  item: Observable<T>;
  shape: Hexagon;
  children?: RenderHexagonListItem<T>;
};

export const HexagonListItem = <T extends { id: number }>({ containerRef, item, shape, children }: Props<T>) => {
  const renderCount = ++useRef(0).current;
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

  /**
   * Apply initial translation on mount
   */
  useEffect(() => {
    if (isIntersect()) {
      updateTranslateX();
    }
  });

  /**
   * Apply translation on scroll
   */
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
        flexBasis: shape.width,
        height: shape.containerHeight,
        // backgroundColor: "red",
        // border: "1px solid black",
      }}
    >
      <motion.div ref={ref} style={{ translate: translateX }}>
        {children?.({ containerRef, item, shape })}
        <Text>{`${renderCount}`}</Text>
      </motion.div>
    </div>
  );
};
