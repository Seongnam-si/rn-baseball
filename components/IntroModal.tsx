import { GameStats } from "@/utils/storageLogics";
import { Image, Modal, Pressable, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

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
            height: "60%",
            borderRadius: 16,
            backgroundColor: "rgba(240,240,240,0.95)",
            padding: 24,
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {gameState === "intro" && (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
                <Text style={{ fontSize: 16, color: "#111" }}>
                  서로 다른 숫자를 맞추는 게임이에요!
                </Text>
                <Text style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
                  숫자의 개수를 선택할 수 있어요!
                </Text>
                <Text style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
                  기회는 기본 11번, 추가로 18번까지 가능해요!
                </Text>
                <View style={{ marginTop: 16, gap: 8 }}>
                  <Text>
                    <Text style={{ color: "#FACC15" }}>S</Text> 숫자와 자리가 모두 맞아요 😃
                  </Text>
                  <Text>
                    <Text style={{ color: "#22C55E" }}>B</Text> 숫자는 있지만 자리가 달라요 😅
                  </Text>
                  <Text>
                    <Text style={{ color: "#EF4444" }}>O</Text> 숫자가 없어요 🤣
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
                  <Pressable
                    style={buttonStyle}
                    onPress={() => helpGameStart("normal")}
                  >
                    <Text style={buttonText}>3 자리</Text>
                  </Pressable>
                  <Pressable
                    style={buttonStyle}
                    onPress={() => helpGameStart("hard")}
                  >
                    <Text style={buttonText}>4 자리</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "win" && (
              <View style={centerBox}>
                <Image
                  source={require("../public/HOMERUN.png")}
                  style={{ height: 300, resizeMode: "contain", marginTop: -150, transform: [{ rotate: "-3deg" }] }}
                />
                <View style={{ marginTop: -80 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {endingMent}
                  </Text>
                  <View style={{ gap: 6, marginTop: 10, alignItems: "center", backgroundColor: "rgba(0,0,0,0.09)", borderRadius: 12, padding: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: "400" }}>
                      이번 게임 : {(currentInning - 1)}이닝
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: "400" }}>
                      소요시간 : {sec} 초
                    </Text>
                    <View style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.1)", width: "100%", alignItems: "center" }}>
                      <Text style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>이번 게임 비율</Text>
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
                            <Text style={{ color: "white", fontWeight: "600" }}>
                              {(ballRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text style={{ fontSize: 10, color: "#666" }}>볼</Text>
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
                            <Text style={{ color: "white", fontWeight: "600" }}>
                              {(strikeRatio * 100).toFixed(0)}%
                            </Text>
                          </View>
                          <Text style={{ fontSize: 10, color: "#666" }}>스트라이크</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Pressable style={[buttonStyle, { marginTop: 20}]} onPress={onRestart}>
                    <Text style={buttonText}>처음으로 돌아가기</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "lose" && (
              <View style={centerBox}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  11번 안에 맞추지 못했어요.
                </Text>
                <Text style={{ marginTop: 4 }}>
                  연장전을 진행하거나, 게임을 포기할 수 있어요.
                </Text>
                <View style={{ gap: 12, marginTop: 16 }}>
                  <Pressable style={buttonStyle} onPress={playExtraInning}>
                    <Text style={buttonText}>연장전 진행</Text>
                  </Pressable>
                  <Pressable style={{ paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, alignItems: "center", backgroundColor: "#6B7280" }} onPress={onRestart}>
                    <Text style={buttonText}>포기하기</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {gameState === "extralose" && (
              <View style={centerBox}>
                <Text style={{ fontSize: 24, fontWeight: "600", color: "#B91C1C" }}>
                  패배했어요 🥲
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 4 }}>
                  정답은 {comNumber} 이었어요.
                </Text>
                <Text style={{ marginTop: 4 }}>
                  게임을 다시 시작해 보세요.
                </Text>
                <View style={{ gap: 12, marginTop: 16 }}>
                  <Pressable style={buttonStyle} onPress={onRestart}>
                    <Text style={buttonText}>다시 시작하기</Text>
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

export default GameModal;
