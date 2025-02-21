import { ViewStyle } from "react-native";

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row", alignItems: "center" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  // @demo remove-block-start
  container: {
    paddingTop: 24 + 32,
    paddingHorizontal: 24,
  } as ViewStyle,
  // @demo remove-block-end
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
};
