import { ObservableObject } from "@legendapp/state";
import { ReactElement } from "react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";
import { device } from "@states/device";

export const HEXAGON_LIST_WIDTH = device.state.windows.width.peek() * 0.8;

/**
 * Usefull to compute coordinate x from coordinate y in trigonometry
 * It works specifically to translate along a 60° diagonal axe
 */
export const DELTA_XY = 1.732; // sqrt(3)

export type RenderHexagonListItem<T> = (props: { item: ObservableObject<T>; shape: Hexagon }) => ReactElement;

type Props = {
  index: number;
  shape: Hexagon;
  children?: JSX.Element;
};

export const HexagonListItem = ({ index, shape, children }: Props) => {
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
      }}
    >
      {children}
    </div>
  );
};
