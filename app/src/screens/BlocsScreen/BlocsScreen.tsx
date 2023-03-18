import { observable, ObservableArray } from "@legendapp/state";
import { HexagonBloc } from "@molecules/HexagonBloc/HexagonBloc";
import { HEX_DEFAULT_INPUT } from "@organisms/HexagonList/helpers/createHexagon";
import { HexagonList } from "@organisms/HexagonList/HexagonList";
import { lifeblocs } from "@states/lifeblocsState";
import { Bloc } from "@states/lifeblocsState/lifeblocsState";

const items = lifeblocs.state.blocs as unknown as ObservableArray<Bloc[]>;

export const BlocsScreen = () => {
  return (
    <HexagonList
      itemShape={HEX_DEFAULT_INPUT}
      items={items}
      renderItem={({ item, shape }) => <HexagonBloc item={item} shape={shape} />}
    />
  );
};
