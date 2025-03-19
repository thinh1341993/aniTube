// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ReactNode } from "react"
import { KeyboardProvider } from "react-native-keyboard-controller"
// import { useThemeColor } from "@/hooks/useThemeColor"
import { TamaguiProvider } from "tamagui"
import tamaguiConfig from "../tamagui.config"
import { Platform } from "react-native"
import { preventAutoHideAsync } from "expo-splash-screen"

import "react-native-reanimated"

// Prevent the splash screen from auto-hiding before asset loading is complete.
preventAutoHideAsync()

const BlankView = ({ children }: { children: ReactNode }) => <>{children}</>

export default function RootLayout() {
  // const colorScheme = useThemeColor().themeName
  const KeyboardProviderWap = Platform.OS !== "web" ? KeyboardProvider : BlankView
  return (
    <TamaguiProvider config={tamaguiConfig}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <KeyboardProviderWap>
        <Slot />
        {/* <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack> */}
        <StatusBar style="auto" />
      </KeyboardProviderWap>
      {/* </ThemeProvider> */}
    </TamaguiProvider>
  )
}
