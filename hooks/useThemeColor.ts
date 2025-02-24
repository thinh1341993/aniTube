/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, palette } from "@/constants/Colors";
import { spacing } from "@/constants/Spacing";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { useCallback, useState } from "react";
import { ColorSchemeName, StyleProp } from "react-native";

type ThemeColors = typeof Colors.light & typeof Colors.dark;
type ThemeName = "light" | "dark";
export interface Theme {
  colors: ThemeColors;
  palette: typeof palette;
  spacing: typeof spacing;
}
interface UseAppThemeValue {
  // The current theme context "light" | "dark"
  themeName: ThemeName;
  // A function to set the theme context override (for switching modes)
  setThemeContextOverride: (newTheme: ThemeName) => void;
  // The current theme object
  themeColors: ThemeColors;
  // A function to apply the theme to a style object.
  // See examples in the components directory or read the docs here:
  // https://docs.infinite.red/ignite-cli/boilerplate/app/utils/
  themed: <T>(
    styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>
  ) => T;

  colorFromProps: string;
}

export function useThemeColor(
  props?: { light?: string; dark?: string },
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark
): UseAppThemeValue {
  const [themeName, setThemeName] = useState<ThemeName>(
    useColorScheme() ?? "dark"
  );
  const themeColors = Colors[themeName];
  const colorFromProps =
    props?.[themeName] || Colors[themeName][colorName || "primaryAccent"];

  const setThemeContextOverride = useCallback((newTheme: ThemeName) => {
    setThemeName(newTheme);
  }, []);

  const themed = useCallback(
    <T>(
      styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>
    ) => {
      const flatStyles = [styleOrStyleFn].flat(3);
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)({
            colors: themeColors,
            palette,
            spacing,
          });
        } else {
          return f;
        }
      });

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T;
    },
    [themeName]
  );

  return {
    themeName,
    themeColors,
    setThemeContextOverride,
    themed,
    colorFromProps,
  };
}

/**
 * Represents a function that returns a styled component based on the provided theme.
 * @template T The type of the style.
 * @param theme The theme object.
 * @returns The styled component.
 *
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * // Then use in a component like so:
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme) => T;
export type ThemedStyleArray<T> = (
  | ThemedStyle<T>
  | StyleProp<T>
  | (StyleProp<T> | ThemedStyle<T>)[]
)[];

type Generator<T extends {}> = (theme: UseAppThemeValue) => T;

export const useThemeToStyles = <T extends {}>(createStyle: Generator<T>) => {
  const theme = useThemeColor();

  const ThemeAwareObject = React.useMemo(
    () => createStyle(theme),
    [createStyle, theme]
  );
  return ThemeAwareObject;
};
