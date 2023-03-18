import "./DebugScreen.css";
import { motion } from "framer-motion";
import { For } from "@legendapp/state/react";
import AppLogo from "@assets/svg/app_logo.svg";
import { observable, ObservableObject } from "@legendapp/state";
import { device } from "@states/device";

const HEX_EDGE = 166;
const HEX_HEIGHT = HEX_EDGE * 2;
const HEX_WIDTH = HEX_EDGE * 1.732;
const HEX_MARGIN = 10;
const HEX_CONTAINER_HEIGHT = HEX_HEIGHT * 0.75;
const ROW_SHIFT = HEX_MARGIN / 1.732;

const listWidth = device.state.windows.width.peek() * 0.8;
const hexPerRow = Math.max(1, Math.trunc(listWidth / (HEX_WIDTH + ROW_SHIFT)));

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

const containerHeight = calculateScrollableContainerHeight(listWidth);

type ItemProps = {
  index: number;
};

function Item({ index }: ItemProps) {
  const rowIndex = Math.trunc(index / hexPerRow);

  const translateX = rowIndex * (HEX_WIDTH * 0.5 + ROW_SHIFT);

  return (
    <div
      style={{
        display: "flex",
        width: HEX_WIDTH,
        height: HEX_CONTAINER_HEIGHT,
        transform: `translateX(${-translateX}px)`,
      }}
    >
      <motion.img
        src={AppLogo}
        height={HEX_HEIGHT}
        width={HEX_WIDTH}
        whileHover={{ scale: 1.05 }}
        style={{
          clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
          // padding: 2,
        }}
      />
    </div>
  );
}

const items = observable(Array.from({ length: 30 }, (_, index) => ({ id: index })));
export default function DebugScreen() {
  return (
    <div
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        overflow: "hidden",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          overflowY: "scroll",
          overflowX: "hidden",
          transform: "rotate(30deg)",
          transformOrigin: "center center",
          height: containerHeight.total,
          width: listWidth,
          backgroundColor: "blue",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            minHeight: containerHeight.hidden + containerHeight.visible / 2 - (HEX_EDGE / 1.732) * 2,
          }}
        />
        <div
          style={{
            width: listWidth,
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            transform: ["rotate(-30deg)"].join(" "),
            transformOrigin: "top left",
            gap: HEX_MARGIN,
            // backgroundColor: "pink",
            // paddingTop: window.innerHeight / 2 - HEX_CONTAINER_HEIGHT / 2,
          }}
        >
          <For each={items} optimized>
            {(_item) => {
              const item = _item as ObservableObject<{ id: number }>;
              return <Item index={item.id.peek()} />;
            }}
          </For>
        </div>
      </div>
    </div>
  );
}
