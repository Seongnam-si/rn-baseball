import { useResponsive } from "@/hooks/useResponsive";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InputWindowProps = {
  userNumber: (number | null)[];
  runJudgeResult: () => void;
  deleteNumberSetter: () => void;
  numLength: number;
  enterActivate: boolean;
};

const InputWindow = ({
  userNumber,
  runJudgeResult,
  deleteNumberSetter,
  numLength,
  enterActivate,
}: InputWindowProps) => {
  const { isTablet, keypadHeight, height } = useResponsive();
  const inputBottom = keypadHeight - Math.round(height * (isTablet ? 0.01 : 0.02));

  return (
    <SafeAreaView
      className="absolute left-0 right-0 px-4"
      style={{
        bottom: inputBottom
      }}
    >
      <View className="mx-auto w-full">
        <View className={`flex-row items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-4 ${isTablet ? "py-6" : "py-3"}`}>
          <View className="flex-1 flex-row justify-center">
            {Array.from({ length: numLength }).map((_, i) => (
              <View key={i} className={`${isTablet ? "w-10" : "w-7"} items-center`}>
                <Text className={`${isTablet ? "text-4xl" : "text-2xl"} font-semibold tracking-widest text-gray-900`}>
                  {userNumber[i] ?? "_"}
                </Text>
              </View>
            ))}
          </View>
          <View className="flex-row items-center gap-2 ml-auto">
            <Pressable
              onPress={deleteNumberSetter}
              className="active:scale-95 p-1"
              style={{ transform: [{ translateY: 3}] }}
            >
              <Image
                source={require("@/public/backspace.png")}
                className={`${isTablet ? "h-10 w-10" : "h-6 w-6"}`}
                resizeMode="contain"
                tintColor="black"
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (!enterActivate) return;
                runJudgeResult();
              }}
              className={`active:scale-95 p-1 ${
                enterActivate ? "opacity-100" : "opacity-40"
              }`}
            >
              <Image
                source={require("@/public/enter.png")}
                className={`${isTablet ? "h-10 w-10" : "h-6 w-6"}`}
                resizeMode="contain"
                tintColor="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InputWindow;
