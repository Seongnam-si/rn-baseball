import { ScrollView, Text, View } from "react-native";

type DisplayProps = {
  attempts: {
    id?: string;
    inputNumber: string;
    roundResult: {
      strike: number;
      ball: number;
      out: number;
    };
  }[];
};

type AttemptRowProps = {
    index: number;
    inputnumber: string;
    roundResult: {
      strike: number;
      ball: number;
      out: number;
    };
    opacity?: number;
    isLatest?: boolean;
  };

const Display = ({ attempts }: DisplayProps) => {

  return (
    <View className="mx-auto w-full max-w-md px-4">
      <View className="rounded-xl border border-black/10 bg-white/70 overflow-hidden">
        <ScrollView
          className="divide-y divide-black/5"
          style={{ maxHeight: 260 }}
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
              />
            ))
          )}
        </ScrollView>
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
}: AttemptRowProps) => {

	return (
		<View
			className={`
        flex-row py-3 items-center
        ${isLatest ? "px-4 w-full" : "px-3 w-[92%] self-center"}
        ${isLatest ? "gap-3" : "gap-2"}
      `}
			style={{ opacity }}
		>
			<Text className="flex-[0.4] text-sm text-gray-500">
				{index}이닝
			</Text>
			<View
				className={`items-center ${
					isLatest ? "flex-[0.5] mr-6" : "flex-[0.45] mr-4"
				}`}
			>
				<Text className="tracking-wider text-gray-900 font-semibold">
					{inputnumber}
				</Text>
			</View>
			<View className="flex-row flex-1 justify-center gap-3">
				<Text className="text-yellow-500 font-semibold">
					S:{roundResult.strike}
				</Text>
				<Text className="text-green-600 font-semibold">
					B:{roundResult.ball}
				</Text>
				<Text className="text-red-500 font-semibold">
					O:{roundResult.out}
				</Text>
			</View>
		</View>
	);
};

export default Display;
