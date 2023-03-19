import { ObservableArray } from "@legendapp/state";
import { HexagonBloc } from "@molecules/HexagonBloc/HexagonBloc";
import { HexagonBlocPlaceholder } from "@molecules/HexagonBloc/HexagonBlocPlaceholder";
import { createHexagon, Hexagon, HEX_DEFAULT_INPUT } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonList } from "@organisms/HexagonList/HexagonList";
import { lifeblocs } from "@states/lifeblocsState";
import { Bloc } from "@states/lifeblocsState/lifeblocsState";

const shape: Hexagon = createHexagon(HEX_DEFAULT_INPUT);
const items = lifeblocs.state.blocs as unknown as ObservableArray<Bloc[]>;

export const BlocsScreen = () => {
  return (
    <HexagonList
      shape={shape}
      items={items}
      renderItem={({ item, shape }) => <HexagonBloc item={item} shape={shape} />}
      renderPlaceholder={() => <HexagonBlocPlaceholder shape={shape} />}
    />
  );
};
