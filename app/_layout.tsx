import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Start Page" }} />
        <Stack.Screen name="mainPage" options={{ headerShown : false }}/>
      </Stack>
    </SafeAreaView>
  );
}
