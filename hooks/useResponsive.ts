import { useWindowDimensions } from "react-native";

const TABLET_BREAKPOINT = 768;
const KEYPAD_HEIGHT_RATIO = { tablet: 0.36, mobile: 0.32 };

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const isTabletPortrait = isTablet && height >= width;
  const keypadHeight = Math.round(height * (isTablet ? KEYPAD_HEIGHT_RATIO.tablet : KEYPAD_HEIGHT_RATIO.mobile));

  return { isTablet, isTabletPortrait, keypadHeight, height };
};
