import { GameStats } from "@/utils/storageLogics";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native";

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
  if (!modalState) return null;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const textSmall = isTablet ? styles.smallFontSizeTablet : styles.smallFontSizeMobile;
  const textMedium = isTablet ? styles.mediumFontSizeTablet : styles.mediumFontSizeMobile;
  const textLarge = isTablet ? styles.largeFontSizeTablet : styles.largeFontSizeMobile;

  return (
    <Modal transparent animationType="fade" visible={modalState}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <View
          style={{
            width: "92%",
            maxWidth: 720,
            height: isTablet ? "80%" : "60%",
            borderRadius: 16,
            backgroundColor: "rgba(240,240,240,0.95)",
            padding: isTablet ? 36 : 24,
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {gameState === "intro" && (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: isTablet ? 24 : 12 }}>
                <Text style={[textLarge, styles.textNormal]}>
                  서로 다른 숫자를 맞추는 게임이에요!
                </Text>
                <Text style={[textMedium, styles.textBlur, { textAlign: "center" }]}>
                  숫자의 개수를 선택할 수 있어요!
                </Text>
                <Text style={[textMedium, styles.textBlur, { textAlign: "center" }]}>
                  기회는 기본 11번, 추가로 18번까지 가능해요!
                </Text>
                <View style={{ marginTop: 16, gap: 8 }}>
                  <Text style={textMedium}>
                    <Text style={styles.textYellow}>S</Text> 숫자와 자리가 모두 맞아요 😃
                  </Text>
                  <Text style={textMedium}>
                    <Text style={styles.textGreen}>B</Text> 숫자는 있지만 자리가 달라요 😅
                  </Text>
                  <Text style={textMedium}>
                    <Text style={styles.textRed}>O</Text> 숫자가 없어요 🤣
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: isTablet ? 24 : 12, marginTop: 16 }}>
                  <Pressable
                    style={buttonStyle}
                    onPress={() => helpGameStart("normal")}
                  >
                    <Text style={[textMedium, buttonText]}>
                      3 자리
                    </Text>
                  </Pressable>
                  <Pressable
                    style={buttonStyle}
                    onPress={() => helpGameStart("hard")}
                  >
                    <Text style={[textMedium, buttonText]}>
                      4 자리
                    </Text>
                  </Pressable>
                </View>
                {isTablet ? 
                  <Text style={[textMedium, styles.textStrong, { marginTop: 12 }]}>
                    📐 가로 모드에서 더욱 편안한 플레이가 가능합니다.
                  </Text>: ""
                }
              </View>
            )}
            {gameState === "win" && (
              <View style={centerBox}>
                <Image
                  source={require("../public/HOMERUN.png")}
                  style={{ height: 300, resizeMode: "contain", marginTop: -150, transform: [{ rotate: "-3deg" }] }}
                />
                <View style={{ marginTop: -80 }}>
                  <Text style={[styles.textStrong, textLarge]}>
                    {endingMent}
                  </Text>
                  <View style={{ gap: 6, marginTop: 10, alignItems: "center", backgroundColor: "rgba(0,0,0,0.09)", borderRadius: 12, padding: 12 }}>
                    <Text style={[styles.textMeduim, textMedium]}>
                      이번 게임 : {(currentInning - 1)}이닝
                    </Text>
                    <Text style={[styles.textMeduim, textMedium]}>
                      소요시간 : {sec} 초
                    </Text>
                    <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.1)", width: "100%", alignItems: "center" }}>
                      <Text style={[styles.textStrong, textSmall, { marginBottom: 4 }]}>
                        이번 게임 비율
                      </Text>
                      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                          <View
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 30,
                              backgroundColor: "#22C55E",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 4,
                            }}
                          >
                            <Text style={[styles.textStrong, textSmall, { color: "white" }]}>
                              {(ballRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text style={[styles.textStrong, textSmall]}>
                            볼
                          </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <View
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 30,
                              backgroundColor: "#FACC15",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 4,
                            }}
                          >
                            <Text style={[styles.textStrong, textSmall, { color: "white" }]}>
                              {(strikeRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text style={[styles.textStrong, textSmall]}>
                            스트라이크
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Pressable style={[buttonStyle, { marginTop: 20}]} onPress={onRestart}>
                    <Text style={[textLarge, buttonText]}>
                      처음으로 돌아가기
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "lose" && (
              <View style={[centerBox, { gap: isTablet ? 24 : 12 }]}>
                <Text style={[styles.textStrong, textLarge]}>
                  11번 안에 맞추지 못했어요.
                </Text>
                <Text style={[textMedium, { marginTop: 4 }]}>
                  연장전을 진행하거나, 게임을 포기할 수 있어요.
                </Text>
                <View style={{ gap: 12, marginTop: 16 }}>
                  <Pressable style={buttonStyle} onPress={playExtraInning}>
                    <Text style={[textLarge, buttonText]}>
                      연장전 진행
                    </Text>
                  </Pressable>
                  <Pressable style={{ paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: "center", backgroundColor: "#6B7280" }} onPress={onRestart}>
                    <Text style={[textLarge, buttonText]}>
                      포기하기
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "extralose" && (
              <View style={[centerBox, { gap: isTablet ? 24 : 12 }]}>
                <Text style={[textLarge, styles.textStrong, styles.textRed]}>
                  패배했어요 🥲
                </Text>
                <Text style={[textLarge, styles.textStrong, { marginTop: 4 }]}>
                  정답은 {comNumber} 이었어요.
                </Text>
                <Text style={[textLarge, styles.textStrong, { marginTop: 4 }]}>
                  게임을 다시 시작해 보세요.
                </Text>
                <View style={{ marginTop: 16 }}>
                  <Pressable style={buttonStyle} onPress={onRestart}>
                    <Text style={[textLarge, buttonText]}>
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

const buttonStyle: ViewStyle = {
  backgroundColor: "#0064FF",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
};

const buttonText: TextStyle = {
  color: "white",
  fontWeight: "600",
};

const centerBox: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
};

const styles = StyleSheet.create({
  smallFontSizeMobile: { fontSize: 10 },
  mediumFontSizeMobile: { fontSize: 14 },
  largeFontSizeMobile: { fontSize: 18 },
  smallFontSizeTablet: { fontSize: 24 },
  mediumFontSizeTablet: { fontSize: 28 },
  largeFontSizeTablet: { fontSize: 32 },
  textStrong: { fontWeight: "600" },
  textMeduim: { fontWeight: "400" },
  textNormal: { color: "#111" },
  textBlur: { color: "#555" },
  textRed: { color: "#EF4444" },
  textGreen: { color: "#22C55E" },
  textYellow: { color: "#FACC15" },
});

export default GameModal;
