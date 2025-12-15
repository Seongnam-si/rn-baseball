import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InputWindowProps = {
  userNumber: (number | null)[];
  judgeTriggerSetter: () => void;
  deleteNumberSetter: () => void;
  numLength: number;
  enterActivate: boolean;
};

const InputWindow = ({
  userNumber,
  judgeTriggerSetter,
  deleteNumberSetter,
  numLength,
  enterActivate,
}: InputWindowProps) => {
  return (
    <SafeAreaView
      className="absolute left-0 right-0 px-4"
      style={{
        bottom: 240
      }}
    >
      <View className="mx-auto w-full max-w-md">
        <View className="flex-row items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-4 py-3">
          <View className="flex-1 flex-row justify-center">
            {Array.from({ length: numLength }).map((_, i) => (
              <View key={i} className="w-7 items-center">
                <Text className="text-2xl font-semibold tracking-widest text-gray-900">
                  {userNumber[i] ?? "_"}
                </Text>
              </View>
            ))}
          </View>
          <View className="flex-row items-center gap-2 ml-auto">
            <Pressable
              onPress={deleteNumberSetter}
              className="active:scale-95 p-1"
            >
              <Image
                source={require("@/public/backspace.png")}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (!enterActivate) return;
                judgeTriggerSetter();
              }}
              className={`active:scale-95 p-1 ${
                enterActivate ? "opacity-100" : "opacity-40"
              }`}
            >
              <Image
                source={require("@/public/enter.png")}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InputWindow;
