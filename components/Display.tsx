import { Attempt } from "@/types/types";
import { useResponsive } from "@/hooks/useResponsive";
import { ScrollView, Text, View } from "react-native";

type DisplayProps = {
  attempts: Attempt[];
};

type AttemptRowProps = {
	index: number;
	inputnumber: number[];
	roundResult: {
		strike: number;
		ball: number;
		out: number;
	};
	opacity?: number;
	isLatest?: boolean;
	isTablet?: boolean;
	tabletTextSize?: "text-2xl" | "text-3xl";
};

const Display = ({ attempts }: DisplayProps) => {
	const { isTablet, isTabletPortrait, height } = useResponsive();
	const tabletTextSize = isTabletPortrait ? "text-2xl" : "text-3xl";
  const displayMaxHeight = isTablet ? Math.round(height * 0.8) : 300;

  return (
    <View className={isTablet ? "flex-1 justify-center" : ""}>
      <View className={`mx-auto w-full px-4 ${isTablet ? "" : "max-w-md"}`}>
        <View className="rounded-xl border border-black/10 bg-white/70 overflow-hidden">
          <ScrollView
            className="divide-y divide-black/5"
            style={{ maxHeight: displayMaxHeight }}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            {attempts.length === 0 ? (
              <Text className="py-6 text-xl text-gray-800 text-center">
                숫자를 입력해 보세요!
              </Text>
            ) : (
              attempts.map((att, idx) => (
				<AttemptRow
					key={att.id ?? idx}
					index={attempts.length - idx}
					inputnumber={att.inputNumber}
					roundResult={att.roundResult}
					opacity={idx === 0 ? 1 : 0.5}
					isLatest={idx === 0}
					isTablet={isTablet}
					tabletTextSize={tabletTextSize}
				/>
			))
		)}
        </ScrollView>
      </View>
      </View>
    </View>
  );
};
  
const AttemptRow = ({
	index,
	inputnumber,
	roundResult,
	opacity = 1,
	isLatest = false,
	isTablet = false,
	tabletTextSize = "text-3xl",
}: AttemptRowProps) => {

	return (
		<View
			className={`
        flex-row items-center
        ${
          isLatest
            ? isTablet
              ? "px-8 w-full"
              : "px-4 w-full"
            : isTablet
              ? "px-6 w-[92%] self-center"
              : "px-3 w-[92%] self-center"
        }
        ${isLatest ? "gap-5" : "gap-2"}
        ${isTablet ? "py-5" : "py-3"}
      `}
			style={{ opacity }}
		>
				<Text
					className={`flex-[0.5] text-gray-500 font-semibold ${isTablet ? tabletTextSize : "text-sm"}`}
				>
					{index}이닝
				</Text>
			<View
				className={`items-center ${
					isLatest ? "flex-[0.5] mr-6" : "flex-[0.45] mr-4"
				}`}
			>
					<Text
						className={`tracking-wider text-gray-900 font-semibold ${isTablet ? tabletTextSize : "text-base"}`}
					>
						{inputnumber}
					</Text>
			</View>
			<View className="flex-row flex-1 justify-center gap-3">
					<Text
						className={`text-yellow-500 font-semibold ${isTablet ? tabletTextSize : "text-sm"}`}
					>
						S:{roundResult.strike}
					</Text>
					<Text
						className={`text-green-600 font-semibold ${isTablet ? tabletTextSize : "text-sm"}`}
					>
						B:{roundResult.ball}
					</Text>
					<Text
						className={`text-red-500 font-semibold ${isTablet ? tabletTextSize : "text-sm"}`}
					>
						O:{roundResult.out}
					</Text>
			</View>
		</View>
	);
};

export default Display;
