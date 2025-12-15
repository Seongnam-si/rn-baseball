import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type IntroModalProps = {
  modalState: boolean;
  gameModeSetter: (mode: "normal" | "hard") => void;
};

const IntroModal = ({ modalState, gameModeSetter }: IntroModalProps) => {
  if (!modalState) return null;

  return (
    <Modal
      visible={modalState}
      transparent
      animationType="fade"
    >
      <View style={styles.centerWrap}>
        <View style={styles.backdrop} />
        <View style={styles.card}>
          <View style={{ gap: 12 }}>
            <Text style={styles.title}>서로 다른 숫자를 맞추는 게임이에요!</Text>
            <Text style={styles.desc}>선택한 난이도에 따라 숫자 길이가 달라져요.</Text>
            <Text style={styles.desc}>기회는 11번, 원한다면 18번까지 진행할 수 있어요!</Text>
          </View>
          <View style={{ gap: 8, marginTop: 16 }}>
            <Text style={styles.rule}>
              <Text style={{ color: "#EAB308", fontWeight: "700" }}>S</Text> 숫자와 자리가 모두 맞아요 😃
            </Text>
            <Text style={styles.rule}>
              <Text style={{ color: "#16A34A", fontWeight: "700" }}>B</Text> 숫자는 있지만 자리가 달라요 😅
            </Text>
            <Text style={styles.rule}>
              <Text style={{ color: "#EF4444", fontWeight: "700" }}>O</Text> 숫자가 없어요 🤣
            </Text>
          </View>
          <View style={styles.row}>
            <Pressable style={styles.btn} onPress={() => gameModeSetter("normal")}>
              <Text style={styles.btnText}>보통</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={() => gameModeSetter("hard")}>
              <Text style={styles.btnText}>어려움</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 16,
    backgroundColor: "white",
    padding: 20,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  title: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  desc: { fontSize: 13, color: "#374151", textAlign: "center" },
  rule: { fontSize: 15, color: "#374151", textAlign: "center" },
  row: { flexDirection: "row", gap: 12, justifyContent: "center", marginTop: 20 },
  btn: { backgroundColor: "#0064FF", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  btnText: { color: "white", fontWeight: "700" },
});

export default IntroModal;
