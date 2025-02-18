import { Link, router, Stack } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
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
        <Button title="Go to Tabs" onPress={() => router.replace("/tabs")} />
        {/* <Link onPress={() => router.replace("/tabs")} href="/tabs">
          Go to Tabs
        </Link> */}
      </View>
    </>
  );
}
