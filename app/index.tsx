import { useFonts } from "expo-font"
import { Link, router, SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"
import { Button } from "tamagui"

export default function Index() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Button title="Go to Tabs" onPress={() => router.replace("/tabs")} /> */}
        <Button theme="blue">Hello world</Button>

        {/* <Link onPress={() => router.replace("/tabs")} href="/tabs">
          Go to Tabs
        </Link> */}
      </View>
    </>
  )
}
