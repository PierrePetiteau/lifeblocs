import { ObservableObject } from "@legendapp/state";
import { ReactElement, useRef } from "react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { device } from "@states/device";
import { Text } from "@atoms/Text";

export const HEXAGON_LIST_WIDTH = device.state.windows.width.peek() * 0.8;

/**
 * Usefull to compute coordinate x from coordinate y in trigonometry
 * It works specifically to translate along a 60° diagonal axe
 */
export const DELTA_XY = 1.732; // sqrt(3)

export type RenderHexagonListItem<T> = (props: { item: ObservableObject<T>; shape: Hexagon }) => ReactElement;

type Props<T> = {
  index: number;
  item: ObservableObject<T>;
  shape: Hexagon;
  children?: RenderHexagonListItem<T>;
};

export const HexagonListItem = <T extends { id: number }>({ index, item, shape, children }: Props<T>) => {
  const renderCount = ++useRef(0).current;

  const rowShift = shape.margin / DELTA_XY;
  const hexPerRow = Math.max(1, Math.trunc(HEXAGON_LIST_WIDTH / (shape.width + rowShift)));
  const rowIndex = Math.trunc(index / hexPerRow);
  const translateX = rowIndex * (shape.width * 0.5 + rowShift);

  return (
    <div
      style={{
        display: "flex",
        width: shape.width,
        height: shape.containerHeight,
        scrollSnapAlign: "center",
        transform: `translateX(${-translateX}px)`,
        // backgroundColor: "red",
      }}
    >
      {children?.({ item, shape })}
      <Text>{`${renderCount}`}</Text>
    </div>
  );
};
