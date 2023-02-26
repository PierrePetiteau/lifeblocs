import { observable } from "@legendapp/state";
import { HEX_DEFAULT_INPUT } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonList } from "@organisms/HexagonList/HexagonList";
import { HexagonSVG } from "components/svg/HexagonSVG";

const initialItems = Array.from({ length: 12 + 42 }, (_, index) => ({ id: index, enabled: Boolean(index < 12) }));
const items = observable(initialItems);

export const BlocsScreen = () => {
  return (
    <HexagonList
      items={items}
      itemShape={HEX_DEFAULT_INPUT}
      renderItem={({ shape, item }) => (
        <HexagonSVG
          height={shape.height}
          width={shape.width}
          variant={item.enabled.get() ? undefined : "disabled"}
          whileHover={{ scale: item.enabled.get() ? 1.05 : undefined }}
          style={{
            clipPath: "polygon(0% 25%, 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%)",
            padding: 2,
          }}
        />
      )}
    />
  );
};
