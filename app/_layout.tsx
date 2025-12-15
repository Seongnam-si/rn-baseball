import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Start Page" }} />
      <Stack.Screen name="mainPage" options={{ title : "Main Page" }}/>
    </Stack>
  );
}
