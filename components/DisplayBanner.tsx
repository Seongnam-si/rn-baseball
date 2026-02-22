import { useBannerLogic } from "@/hooks/useBannerLogic";
import { useResponsive } from "@/hooks/useResponsive";
import { DisplayBannerProps } from "@/types/types";
import { Image, View } from "react-native";

const BALL_IMAGES: Record<number, any> = {
  1: require("../public/BALL1.png"),
  2: require("../public/BALL2.png"),
  3: require("../public/BALL3.png"),
  4: require("../public/BALL4.png"),
};
const STRIKE_IMAGES: Record<number, any> = {
  1: require("../public/STRIKE1.png"),
  2: require("../public/STRIKE2.png"),
  3: require("../public/STRIKE3.png"),
};

const DisplayBanner = ({ modalState, attempts }: DisplayBannerProps) => {
	const { isVisible, contentType } = useBannerLogic({ modalState, attempts });
  const { isTablet } = useResponsive();
  const imgSize = isTablet ? 186 : 128;

  if (modalState || !isVisible) {
    return null;
  }

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: isTablet ? 30 : -30
      }}
    >
      {contentType.type === "playball" && (
        <Image
          source={require("../public/PLAYBALL.png")}
          style={{ height: imgSize, resizeMode: "contain" }}
        />
      )}
      {contentType.type === "ball" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            transform: [{ rotate: "-3deg" }],
          }}
        >
          <Image
            source={BALL_IMAGES[contentType.ballCount]}
            style={{
              height: imgSize,
              width: imgSize,
              resizeMode: "contain",
              marginRight: -96,
            }}
          />
          <Image
            source={require("../public/BALL.png")}
            style={{ 
              height: imgSize, 
              width: imgSize,
              resizeMode: "contain" 
            }}
          />
        </View>
      )}
      {contentType.type === "strike" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            transform: [{ rotate: "3deg" }],
          }}
        >
          <Image
            source={STRIKE_IMAGES[contentType.strikeCount]}
            style={{
              height: imgSize,
              width: imgSize,
              resizeMode: "contain",
              marginRight: -80,
            }}
          />
          <Image
            source={require("../public/STRIKE.png")}
            style={{ 
              height: imgSize, 
              width: imgSize,
              resizeMode: "contain" 
            }}
          />
        </View>
      )}
      {contentType.type === "mixed" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              transform: [{ rotate: "-6deg" }],
              marginRight: -48,
            }}
          >
            <Image
              source={BALL_IMAGES[contentType.ballCount]}
              style={{
                height: imgSize,
                width: imgSize,
                resizeMode: "contain",
                marginRight: -96,
              }}
            />
            <Image
              source={require("../public/BALL.png")}
              style={{ 
                height: imgSize, 
                width: imgSize,
                resizeMode: "contain" 
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              transform: [{ rotate: "6deg" }],
            }}
          >
            <Image
              source={STRIKE_IMAGES[contentType.strikeCount]}
              style={{
                height: imgSize,
                width: imgSize,
                resizeMode: "contain",
                marginRight: -80,
              }}
            />
            <Image
              source={require("../public/STRIKE.png")}
              style={{ 
                height: imgSize, 
                width: imgSize,
                resizeMode: "contain" 
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DisplayBanner;
