import { Text, View } from "react-native";

type TopBannerProps = {
  sec: number;
};

const TopBanner = ({ sec }: TopBannerProps) => {
  return (
    <View className="mx-auto w-full max-w-md px-4">
      <View className="flex-row overflow-hidden py-3 items-center justify-center">
        <Text className="text-xl mr-2">
          ⏱️ 
        </Text>
        <Text
          className="text-semibold text-xl tracking-widest"
          style={{
            width: 60,
            fontVariant: ["tabular-nums"]
          }}
        >
          {sec}
        </Text>
      </View>
    </View>
  );
};

export default TopBanner;
