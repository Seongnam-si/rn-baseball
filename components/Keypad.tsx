import { useResponsive } from "@/hooks/useResponsive";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type KeypadProps = {
  numberSetter: (num: number) => void;
};

const Keypad = ({ numberSetter }: KeypadProps) => {
  const { isTablet, keypadHeight } = useResponsive();
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View className="absolute left-0 right-0 bottom-0 z-20">
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white/80"
        style={{ height: keypadHeight }}
      >
        <View className="flex-row flex-wrap h-full">
          {keys.map((num) => (
            <Pressable
              key={num}
              onPress={() => numberSetter(num)}
              className="w-1/3 h-1/3 items-center justify-center border border-black/10"
            >
              <Text className={`${isTablet ? "text-[38px]" : "text-2xl"} font-medium text-black`}>
                {num}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Keypad;
