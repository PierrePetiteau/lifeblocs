import { ObservableArray } from "@legendapp/state";
import { For } from "@legendapp/state/react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import {
  DELTA_XY,
  HexagonListItem,
  HEXAGON_LIST_WIDTH,
  RenderHexagonListItem,
} from "@organisms/HexagonList/HexagonListItem";
import { ObservableObject } from "@legendapp/state";

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

const containerHeight = calculateScrollableContainerHeight(HEXAGON_LIST_WIDTH);

type Props<T> = {
  shape: Hexagon;
  items: ObservableArray<T[]>;
  renderItem: RenderHexagonListItem<T>;
  renderPlaceholder: () => JSX.Element;
};

export const HexagonList = <T extends { id: number }>({ shape, items, renderItem, renderPlaceholder }: Props<T>) => {
  const rowShift = shape.margin / DELTA_XY;
  const hexPerRow = Math.max(1, Math.trunc(HEXAGON_LIST_WIDTH / (shape.width + rowShift)));
  const placeholdersAmount = 30 - (items.length % hexPerRow);
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
          width: HEXAGON_LIST_WIDTH,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            minHeight: containerHeight.hidden + containerHeight.visible / 2 - (shape.edge / DELTA_XY) * 2,
          }}
        />
        <div
          style={{
            width: HEXAGON_LIST_WIDTH,
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
                <HexagonListItem index={index} shape={shape}>
                  {renderItem({ item, shape })}
                </HexagonListItem>
              );
            }}
          </For>
          {placeholders.map(({ index }) => {
            return (
              <HexagonListItem key={index} index={index} shape={shape}>
                {renderPlaceholder()}
              </HexagonListItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
