import useBannerLogic from "@/hooks/useBannerLogic";
import { DisplayBannerProps } from "@/types/types";
import { Image, View } from "react-native";

const IMAGE_HEIGHT = 128;

const DisplayBanner = ({ modalState, attempts }: DisplayBannerProps) => {
	const { isVisible, contentType } = useBannerLogic({ modalState, attempts });

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
      }}
    >
      {contentType.type === "playball" && (
        <Image
          source={require("../public/PLAYBALL.png")}
          style={{ height: IMAGE_HEIGHT, resizeMode: "contain" }}
        />
      )}
      {contentType.type === "ball" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            transform: [{ rotate: "-3deg" }],
          }}
        >
          <Image
            source={require(`../public/BALL${contentType.ballCount}.png`)}
            style={{
              height: IMAGE_HEIGHT,
              resizeMode: "contain",
              marginRight: -96,
            }}
          />
          <Image
            source={require("../public/BALL.png")}
            style={{ height: IMAGE_HEIGHT, resizeMode: "contain" }}
          />
        </View>
      )}
      {contentType.type === "strike" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            transform: [{ rotate: "3deg" }],
          }}
        >
          <Image
            source={require(`../public/STRIKE${contentType.strikeCount}.png`)}
            style={{
              height: IMAGE_HEIGHT,
              resizeMode: "contain",
              marginRight: -80,
            }}
          />
          <Image
            source={require("../public/STRIKE.png")}
            style={{ height: IMAGE_HEIGHT, resizeMode: "contain" }}
          />
        </View>
      )}
      {contentType.type === "mixed" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "-6deg" }],
              marginRight: -48,
            }}
          >
            <Image
              source={require(`../public/BALL${contentType.ballCount}.png`)}
              style={{
                height: IMAGE_HEIGHT,
                resizeMode: "contain",
                marginRight: -96,
              }}
            />
            <Image
              source={require("../public/BALL.png")}
              style={{ height: IMAGE_HEIGHT, resizeMode: "contain" }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "6deg" }],
            }}
          >
            <Image
              source={require(`../public/STRIKE${contentType.strikeCount}.png`)}
              style={{
                height: IMAGE_HEIGHT,
                resizeMode: "contain",
                marginRight: -80,
              }}
            />
            <Image
              source={require("../public/STRIKE.png")}
              style={{ height: IMAGE_HEIGHT, resizeMode: "contain" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DisplayBanner;
