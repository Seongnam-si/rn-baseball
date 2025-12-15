import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {

  const handleTouch = () => {
    router.push("./mainPage");
  }

  return (
    <Pressable
      className="
        min-h-full w-full flex
        items-center justify-center text-center px-4
      "
      onPress={handleTouch}
    >
      <View
        className="
          max-w-md w-full
          items-center
          tracking-widest
        "
      >
        <Text
          className="font-semibold text-5xl"
        >
          ⚾ 숫자야구 ⚾
        </Text>
        <Text
          className="mt-12 text-xl"
        >
          화면을 터치해 주세요!
        </Text>
      </View>
    </Pressable>
  );
}
