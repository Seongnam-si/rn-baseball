import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {

  const handleTouch = () => {
    router.push("./mainPage");
  }

  return (
    <View className="flex-1 px-6 items-center justify-center">
      <Image 
        source={require("../public/mainimg.png")}
        style={{ resizeMode: "contain", height: 200 }}
      />
      <Text className="font-extrabold text-6xl tracking-wide text-gray-800 mt-8">
        숫자야구
      </Text>
      <Text className="font-semibold text-2xl text-gray-600 mt-6">
        숫자를 추리하고 홈런을 날리세요 ⚾️
      </Text>
      <Pressable 
        className="rounded-full w-40 h-20 bg-[#0064FF] items-center justify-center mt-10"
        onPress={handleTouch}
      >
        <Text className="font-bold text-2xl text-white">
          게임 시작
        </Text>
      </Pressable>
    </View>
  );
}
