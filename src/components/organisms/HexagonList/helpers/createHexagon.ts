export type HexagonInput = {
  margin: number;
  edge: number;
};

export type Hexagon = {
  edge: number;
  height: number;
  width: number;
  margin: number;
  containerHeight: number;
};

export const HEX_DEFAULT_INPUT: HexagonInput = {
  edge: 166,
  margin: 20,
};

export const createHexagon: (input?: HexagonInput) => Hexagon = (input = HEX_DEFAULT_INPUT) => {
  return {
    edge: input.edge,
    height: input.edge * 2,
    width: Math.sqrt(3) * input.edge,
    margin: input.margin,
    containerHeight: input.edge * 1.5,
  };
};
