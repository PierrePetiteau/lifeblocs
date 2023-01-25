import tinycolor from "tinycolor2";

const hex = (hex: tinycolor.ColorInput) => tinycolor(hex);
const rgba = (hex: tinycolor.ColorInput, alpha: number) => tinycolor(hex).setAlpha(alpha);

export type NeutralColors = typeof neutralColors;
export const neutralColors = {
  black: hex("#000000"),
  gray80: hex("#333333"),
  gray60: hex("#666666"),
  gray40: hex("#999999"),
  gray20: hex("#CCCCCC"),
  gray10: hex("#E5E5E5"),
  gray03: hex("#F8F8F8"),
  white: hex("#FFFFFF"),
  transparentBlack: rgba("#000000", 0),
  transparentWhite: rgba("#FFFFFF", 0),
};

export type MainColors = typeof mainColors;
export const mainColors = {
  purple: hex("#594FF4"),
  purple10: rgba("#594FF4", 0.1),
  pink: hex("#FF5FCB"),
  pink10: rgba("#FF5FCB", 0.1),
  blue: hex("#4580FF"),
  blue10: rgba("#4580FF", 0.1),
  red: hex("#FF2D55"),
  red10: rgba("#FF2D55", 0.1),
  orange: hex("#FF6813"),
  orange10: rgba("#FF6813", 0.1),
  yellow: hex("#FFE500"),
  yellow10: rgba("#FFE500", 0.1),
  green: hex("#02CB59"),
  green10: rgba("#02CB59", 0.1),
  navy: hex("#16002C"),
  navy10: rgba("#16002C", 0.1),
  indigo10: rgba("#5856D6", 0.1),
  indigo: hex("#5856D6"),
  redOrange: hex("#FF3B30"),
};

export type PastelColors = typeof pastelColors;
export const pastelColors = {
  mushroom: hex("#DFDACD"),
  pastelPink: hex("#E8D6D5"),
  pastelPurple: hex("#E4DFFF"),
  greyBrand: hex("#EFEEF2"),
};

export type AliasColors = typeof aliasColors;
export const aliasColors = {
  elevation1: hex("#202225"),
  elevation2: hex("#36383F"),
  text: neutralColors.white,
  border: neutralColors.white,
};

export type Colors = typeof colors;
export const colors = { ...neutralColors, ...mainColors, ...pastelColors, ...aliasColors };
