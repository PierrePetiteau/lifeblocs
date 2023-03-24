import { ObservableArray } from "@legendapp/state";
import { For } from "@legendapp/state/react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { DELTA_XY, HexagonListItem, RenderHexagonListItem } from "@organisms/HexagonList/HexagonListItem";
import { ObservableObject } from "@legendapp/state";
import { device } from "@states/device";
import { useMemo } from "react";

const calculateScrollableContainerHeight = (containerWidth: number) => {
  const angle = Math.PI / 6; // 30° in radians
  const visibleHeight = window.innerHeight / Math.cos(angle);
  const hiddenHeight = Math.tan(angle) * containerWidth;

  return {
    visible: visibleHeight,
    hidden: hiddenHeight,
    total: visibleHeight + hiddenHeight,
  };
};

type Props<T> = {
  shape: Hexagon;
  items: ObservableArray<T[]>;
  renderItem: RenderHexagonListItem<T>;
  renderPlaceholder: () => JSX.Element;
};

export const HexagonList = <T extends { id: number }>({ shape, items, renderItem, renderPlaceholder }: Props<T>) => {
  const dimensions = useMemo(() => {
    let width = shape.width;
    let hexPerRow = 1;
    while (width + shape.width + shape.margin < device.state.windows.width.peek() * 0.7) {
      hexPerRow++;
      width += shape.width + shape.margin;
    }
    return { hexPerRow, width };
  }, [shape.margin, shape.width]);

  const containerHeight = calculateScrollableContainerHeight(dimensions.width);
  const placeholdersAmount = 30 - (items.length % dimensions.hexPerRow) - (30 % dimensions.hexPerRow);
  const placeholders = Array.from({ length: placeholdersAmount }, (_, index) => ({ index: index + items.length }));

  return (
    <div
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        overflow: "hidden",
        paddingLeft: 80,
      }}
    >
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          overflowY: "scroll",
          overflowX: "hidden",
          transform: "translateX(-50%) translateY(-50%) rotate(30deg)",
          transformOrigin: "center center",
          height: containerHeight.total,
          width: dimensions.width + shape.containerHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minHeight: containerHeight.hidden + containerHeight.visible / 2 - (shape.edge / DELTA_XY) * 2,
          }}
        />
        <div
          style={{
            width: dimensions.width,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            transform: ["rotate(-30deg)"].join(" "),
            transformOrigin: "top left",
            gap: shape.margin,
          }}
        >
          <For each={items} optimized>
            {(_item) => {
              const item = _item as unknown as ObservableObject<T>;
              const index = item.peek().id;

              return (
                <HexagonListItem index={index} shape={shape} hexPerRow={dimensions.hexPerRow}>
                  {renderItem({ item, shape })}
                </HexagonListItem>
              );
            }}
          </For>
          {placeholders.map(({ index }) => {
            return (
              <HexagonListItem key={index} index={index} shape={shape} hexPerRow={dimensions.hexPerRow}>
                {renderPlaceholder()}
              </HexagonListItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
