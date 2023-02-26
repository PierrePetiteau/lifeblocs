import { Observable, ObservableArray } from "@legendapp/state";
import { For } from "@legendapp/state/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { createHexagon, HexagonInput } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonListItem, RenderHexagonListItem } from "@organisms/HexagonList/HexagonListItem";

type Props<T> = {
  items: ObservableArray<T[]>;
  renderItem: RenderHexagonListItem<T>;
  itemShape: HexagonInput;
};

export const HexagonList = <T extends { id: number }>({ items, renderItem, itemShape }: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexagon = useMemo(() => createHexagon(itemShape), [itemShape]);

  /**
   * developpement feature
   * refresh items position when resizing window
   */
  useEffect(() => {
    window.onresize = () => {
      containerRef.current?.scrollTo({ top: containerRef.current?.scrollTop + 1 });
    };
  });

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "fixed",
        width: "100vw",
        height: `calc(100vh + ${(hexagon.height + hexagon.margin) * 2.25}px)`,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <motion.div
        style={{
          width: "70vw",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: hexagon.margin,
          paddingTop: `calc(50vh - ${hexagon.edge}px)`,
        }}
      >
        <For each={items} optimized>
          {(item) => (
            <HexagonListItem item={item as Observable<T>} shape={hexagon} containerRef={containerRef}>
              {renderItem}
            </HexagonListItem>
          )}
        </For>
      </motion.div>
    </motion.div>
  );
};
