import { useResponsive } from "@/hooks/useResponsive";
import { GameStats } from "@/utils/storageLogics";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type ModalProps = {
  modalState: boolean;
  gameState?: "intro" | "win" | "lose" | "extralose";
  onRestart: () => void;
  playExtraInning: () => void;
  endingMent: string;
  gameStats: GameStats | null;
  currentInning: number;
  ballRatio: number;
  strikeRatio: number;
  comNumber: number[];
  sec: number;
  helpGameStart: (mode: "normal" | "hard") => void;
};

const GameModal = ({
  modalState,
  gameState = "intro",
  onRestart,
  playExtraInning,
  endingMent,
  currentInning,
  ballRatio,
  strikeRatio,
  comNumber,
  sec,
  helpGameStart
}: ModalProps) => {
  const { isTablet } = useResponsive();
  const fontSm = isTablet ? "text-2xl" : "text-[10px]";
  const fontMd = isTablet ? "text-[28px]" : "text-sm";
  const fontLg = isTablet ? "text-[32px]" : "text-lg";
  const btnCls = "bg-[#0064FF] px-5 py-3 rounded-xl items-center";

  if (!modalState) return null;

  return (
    <Modal transparent animationType="fade" visible={modalState}>
      <View className="flex-1 bg-black/30 items-center justify-center p-4">
        <View
          className={`w-[92%] max-w-[720px] rounded-2xl ${isTablet ? "h-4/5 p-9" : "h-3/5 p-6"}`}
          style={{ backgroundColor: "rgba(240,240,240,0.95)" }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {gameState === "intro" && (
              <View className={`flex-1 items-center justify-center ${isTablet ? "gap-6" : "gap-3"}`}>
                <Text className={fontLg} style={styles.textNormal}>
                  서로 다른 숫자를 맞추는 게임이에요!
                </Text>
                <Text className={`${fontMd} text-center`} style={styles.textBlur}>
                  숫자의 개수를 선택할 수 있어요!
                </Text>
                <Text className={`${fontMd} text-center`} style={styles.textBlur}>
                  기회는 기본 11번, 추가로 18번까지 가능해요!
                </Text>
                <View className="mt-4 gap-2">
                  <Text className={fontMd}>
                    <Text style={styles.textYellow}>S</Text> 숫자와 자리가 모두 맞아요 😃
                  </Text>
                  <Text className={fontMd}>
                    <Text style={styles.textGreen}>B</Text> 숫자는 있지만 자리가 달라요 😅
                  </Text>
                  <Text className={fontMd}>
                    <Text style={styles.textRed}>O</Text> 숫자가 없어요 🤣
                  </Text>
                </View>
                <View className={`flex-row mt-4 ${isTablet ? "gap-6" : "gap-3"}`}>
                  <Pressable
                    className={btnCls}
                    onPress={() => helpGameStart("normal")}
                  >
                    <Text className={`${fontMd} text-white font-semibold`}>
                      3 자리
                    </Text>
                  </Pressable>
                  <Pressable
                    className={btnCls}
                    onPress={() => helpGameStart("hard")}
                  >
                    <Text className={`${fontMd} text-white font-semibold`}>
                      4 자리
                    </Text>
                  </Pressable>
                </View>
                {isTablet ?
                  <Text className={`${fontMd} mt-3`} style={styles.textStrong}>
                    📐 가로 모드에서 더욱 편안한 플레이가 가능합니다.
                  </Text> : ""
                }
              </View>
            )}
            {gameState === "win" && (
              <View className="flex-1 items-center justify-center gap-1.5">
                <Image
                  source={require("../public/HOMERUN.png")}
                  style={{ height: 300, resizeMode: "contain", marginTop: -150, transform: [{ rotate: "-3deg" }] }}
                />
                <View className="-mt-20">
                  <Text className={fontLg} style={styles.textStrong}>
                    {endingMent}
                  </Text>
                  <View
                    className="gap-1.5 mt-2.5 items-center rounded-xl p-3"
                    style={{ backgroundColor: "rgba(0,0,0,0.09)" }}
                  >
                    <Text className={fontMd} style={styles.textMeduim}>
                      이번 게임 : {(currentInning - 1)}이닝
                    </Text>
                    <Text className={fontMd} style={styles.textMeduim}>
                      소요시간 : {sec} 초
                    </Text>
                    <View className="mt-2 pt-2 border-t border-black/10 w-full items-center">
                      <Text className={`${fontSm} mb-1`} style={styles.textStrong}>
                        이번 게임 비율
                      </Text>
                      <View className="flex-row gap-4 items-center">
                        <View className="items-center">
                          <View className="w-[60px] h-[60px] rounded-full bg-green-500 items-center justify-center mb-1">
                            <Text className={`${fontSm} text-white`} style={styles.textStrong}>
                              {(ballRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text className={fontSm} style={styles.textStrong}>
                            볼
                          </Text>
                        </View>
                        <View className="items-center">
                          <View className="w-[60px] h-[60px] rounded-full bg-yellow-400 items-center justify-center mb-1">
                            <Text className={`${fontSm} text-white`} style={styles.textStrong}>
                              {(strikeRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text className={fontSm} style={styles.textStrong}>
                            스트라이크
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Pressable className={`${btnCls} mt-5`} onPress={onRestart}>
                    <Text className={`${fontLg} text-white font-semibold`}>
                      처음으로 돌아가기
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "lose" && (
              <View className={`flex-1 items-center justify-center ${isTablet ? "gap-6" : "gap-3"}`}>
                <Text className={fontLg} style={styles.textStrong}>
                  11번 안에 맞추지 못했어요.
                </Text>
                <Text className={`${fontMd} mt-1`}>
                  연장전을 진행하거나, 게임을 포기할 수 있어요.
                </Text>
                <View className="gap-3 mt-4">
                  <Pressable className={btnCls} onPress={playExtraInning}>
                    <Text className={`${fontLg} text-white font-semibold`}>
                      연장전 진행
                    </Text>
                  </Pressable>
                  <Pressable className="px-5 py-3 rounded-xl items-center bg-gray-500" onPress={onRestart}>
                    <Text className={`${fontLg} text-white font-semibold`}>
                      포기하기
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "extralose" && (
              <View className={`flex-1 items-center justify-center ${isTablet ? "gap-6" : "gap-3"}`}>
                <Text className={fontLg} style={[styles.textStrong, styles.textRed]}>
                  패배했어요 🥲
                </Text>
                <Text className={`${fontLg} mt-1`} style={styles.textStrong}>
                  정답은 {comNumber} 이었어요.
                </Text>
                <Text className={`${fontLg} mt-1`} style={styles.textStrong}>
                  게임을 다시 시작해 보세요.
                </Text>
                <View className="mt-4">
                  <Pressable className={btnCls} onPress={onRestart}>
                    <Text className={`${fontLg} text-white font-semibold`}>
                      다시 시작하기
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textStrong: { fontWeight: "600" },
  textMeduim: { fontWeight: "400" },
  textNormal: { color: "#111" },
  textBlur: { color: "#555" },
  textRed: { color: "#EF4444" },
  textGreen: { color: "#22C55E" },
  textYellow: { color: "#FACC15" },
});

export default GameModal;
