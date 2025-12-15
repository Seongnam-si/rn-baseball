import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type KeypadProps = {
  numberSetter: (num: number) => void;
};

const Keypad = ({ numberSetter }: KeypadProps) => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View className="absolute left-0 right-0 bottom-0 z-20">
      <SafeAreaView
        edges={["bottom"]}
        className="bg-white/80"
        style={{ height: 260 }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", height: "100%" }}>
          {keys.map((num) => (
            <Pressable
              key={num}
              onPress={() => numberSetter(num)}
              style={{
                width: "33.3%",
                height: "33.3%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500", color: "black" }}>
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
