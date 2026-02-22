import { Text, View, useWindowDimensions } from "react-native";

type TopBannerProps = {
  sec: number;
};

const TopBanner = ({ sec }: TopBannerProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View className={`${isTablet ? "mt-10" : ""} mx-auto w-full px-4`}>
      <View className="flex-row overflow-hidden py-3 items-center justify-center">
        <Text className={`${isTablet ? "text-5xl" : "text-xl"} mr-2`}>
          ⏱️ 
        </Text>
        <Text
          className={`${isTablet ? "text-5xl" : "text-xl"} text-semibold tracking-widest`}
          style={{
            width: isTablet ? 100 : 60,
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
