import { Dimensions, StyleSheet } from 'react-native';
import hexRgb from 'hex-rgb';

// Dimensions
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// Colors
export enum Colors {
  TRANSPARENT = 'transparent',
  WHITE = '#FFFFFF',
  BLACK = '#000000',
  PRIMARY = '#010D59',
  PRIMARY_DARK = '#0E2F31',
  PRIMARY_MEDIUM = '#51676B',
  PRIMARY_MEDIUM_LIGHT = '#86A099',
  PRIMARY_LIGHT = '#DCEBE7',
  PRIMARY_PRESS = '#011070',
  PRIMARY_ACTIVE = '#D3DFE7',
  SPECIAL = '#007343',
  SPECIAL_MEDIUM = '#A6C8BE',
  SPECIAL_MEDIUM_LIGHT = '#99CFBA',
  SPECIAL_LIGHT = '#C8E1DA',
  SECONDARY = '#FF671F',
  SECONDARY_MEDIUM = '#EBC53C',
  SECONDARY_UNPLAYED = '#5D6C87',
  SECONDARY_HOVER = '#A8B9CA',
  ERROR = '#F64669',
  WARNING_HOVER_PRESS = '#DD214F',
  YELLOW = '#FFD159',
  BACKGROUND_LIGHT = '#2060ea',
  BACKGROUND_MAIN = '#142383',
  ACCENT = '#37FFDB',
  ACCENT_UNFIELD = '#15A88D',
  ACCENT_HOVERPRESS = '#1FF0CA',
  BORDER_BRIGHT = '#0E3ED0',
  ACCENT_TEXT_COLOR = '#37FFDB',
  SURFACE_PRIMARY = '#000838',
  SURFACE_PRIMARY_INVERT = '#FBFCFE',
  SURFACE_SECONDARY = '#2E3748',
  SHADOW_COLOR = '#1D212D'
}

// BaseStyle
export const baseStyle = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 88,
  },
  detailScreenGradientWrapper: {
    top: 70,
    backgroundColor: Colors.BACKGROUND_MAIN,
  },
});

export enum Fonts {
  BOLD = 'RundDisplay-Bold',
  TEXT_BOLD = 'RundText-Bold',
  TEXT_REGULAR = 'RundText-Regular',
}

export enum Spacing {
  NONE = 0,
  XS = 4,
  SM = 8,
  MD = 16,
  LG = 24,
  XL = 32,
  '2XL' = 48,
  '3XL' = 104,
}

export enum Radius {
  NONE = 0,
  SM = 4,
  MD = 8,
  LG = 16,
  XL = 24,
  FULL = 360,
}

export const getColorsRgba = (color: string, alpha?: number) => {
  const rgbaObj = hexRgb(color);
  return `rgba(${rgbaObj.red}, ${rgbaObj.green}, ${rgbaObj.blue}, ${
    alpha !== undefined ? alpha : rgbaObj.alpha
  })`;
};

