import { ObservableObject } from "@legendapp/state";
import { ReactElement } from "react";
import { Hexagon } from "@organisms/HexagonList/helpers/createHexagon";

/**
 * Usefull to compute coordinate x from coordinate y in trigonometry
 * It works specifically to translate along a 60° diagonal axe
 */
export const DELTA_XY = 1.732; // sqrt(3)

export type RenderHexagonListItem<T> = (props: { item: ObservableObject<T>; shape: Hexagon }) => ReactElement;

type Props = {
  index: number;
  shape: Hexagon;
  hexPerRow: number;
  children?: JSX.Element;
};

export const HexagonListItem = ({ index, shape, hexPerRow, children }: Props) => {
  const rowShift = shape.margin / DELTA_XY;
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
