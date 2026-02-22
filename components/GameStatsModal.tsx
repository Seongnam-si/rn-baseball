import { useResponsive } from "@/hooks/useResponsive";
import { GameRecord, loadRecentGames } from "@/utils/storageLogics";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type GameStatsModalProps = {
	isVisible: boolean;
	onClose: () => void;
}

const GameStatsModal = ({ isVisible, onClose }: GameStatsModalProps) => {
  const { isTablet } = useResponsive();
  const textSmall = isTablet ? styles.smallFontSizeTablet : styles.smallFontSizeMobile;
  const textMedium = isTablet ? styles.mediumFontSizeTablet : styles.mediumFontSizeMobile;
  const textLarge = isTablet ? styles.largeFontSizeTablet : styles.largeFontSizeMobile;
	const [recentGames, setRecentGames] = useState<GameRecord[]>([]);

	const handleShow = () => {
		loadRecentGames().then((data) => {
			setRecentGames(data.games);
		});
	};

	const winCount = recentGames.filter((g) => g.result === "win").length;
  const loseCount = recentGames.filter((g) => g.result === "lose" || g.result === "extralose").length;
  const avgInnings = recentGames.length > 0
    ? recentGames.reduce((sum, g) => sum + g.innings, 0) / recentGames.length
    : 0;
  const avgBallRatio = recentGames.length > 0
    ? recentGames.reduce((sum, g) => sum + g.ballRatio, 0) / recentGames.length
    : 0;
  const avgStrikeRatio = recentGames.length > 0
    ? recentGames.reduce((sum, g) => sum + g.strikeRatio, 0) / recentGames.length
    : 0;
  const avgSec = recentGames.length > 0
    ? recentGames.reduce((sum, g) => sum + g.sec, 0) / recentGames.length
    : 0;

	return (
		<Modal transparent animationType="fade" visible={isVisible} onRequestClose={onClose} onShow={handleShow}>
			<View style={{ flex:1, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center", padding: 16 }}>
				<View style={{ width: "92%", maxWidth: 720, height: "80%", borderRadius: 16, backgroundColor: "rgba(240,240,240,0.95)", padding: isTablet? 36 : 24}}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Text style={[textLarge, styles.textTitle]}>
							최근 10게임 통계
						</Text>
            <Pressable onPress={onClose}>
              <Text style={[textLarge, styles.textClose]}>
								X
							</Text>
            </Pressable>
          </View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 12, padding: isTablet ? 24 : 16, marginBottom: isTablet ? 24 : 16 }}>
							<Text style={[textMedium, styles.textStrong, { marginBottom: isTablet ? 16 : 12 }]}>요약</Text>
							<View style={{ gap: isTablet ? 12 : 8 }}>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
									<Text style={[textMedium, styles.textNormal]}>승리</Text>
                  <Text style={[textMedium, styles.textStrong, styles.textBlue]}>{winCount}회</Text>
								</View>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[textMedium, styles.textNormal]}>패배</Text>
                  <Text style={[textMedium, styles.textStrong, styles.textRed]}>{loseCount}회</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[textMedium, styles.textNormal]}>평균 이닝</Text>
                  <Text style={[textMedium, styles.textStrong]}>{avgInnings.toFixed(1)}이닝</Text>
                </View>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[textMedium, styles.textNormal]}>평균 볼 비율</Text>
                  <Text style={[textMedium, styles.textStrong, styles.textGreen]}>
                    {(avgBallRatio * 100).toFixed(1)}%
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[textMedium, styles.textNormal]}>평균 스트라이크 비율</Text>
                  <Text style={[textMedium, styles.textStrong, styles.textYellow]}>
                    {(avgStrikeRatio * 100).toFixed(1)}%
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[textMedium, styles.textNormal]}>평균 플레이 시간</Text>
                  <Text style={[textMedium, styles.textStrong]}>{Math.round(avgSec)}초</Text>
                </View>
							</View>
						</View>
						<View style={{ marginBottom: 16 }}>
              <Text style={[textLarge, styles.textStrong, { marginBottom: isTablet ? 18 : 12 }]}>게임별 기록</Text>
              {recentGames.length === 0 ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <Text style={[textMedium, styles.textBlur]}>기록이 없습니다</Text>
                </View>
              ) : (
                <View style={{ gap: 8 }}>
                  {recentGames.map((game, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.8)",
                        borderRadius: 12,
                        padding: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", gap: isTablet ? 14 :  8, alignItems: "center", marginBottom: 4 }}>
                          <Text
                            style={[
                              textMedium,
                              styles.textStrong,
                              game.result === "win" ? styles.textGreen : styles.textRed,
                            ]}
                          >
                            {game.result === "win" ? "승리" : game.result === "extralose" ? "연장패배" : "패배"}
                          </Text>
                          <Text style={[textSmall, styles.textStrong, styles.textBlur]}>
                            {game.innings}이닝
                          </Text>
                          <Text style={[textSmall, styles.textStrong, styles.textBlur]}>
                            {game.numLength}자리
                          </Text>
                          <Text style={[textSmall, styles.textStrong, styles.textBlur]}>
                            {game.sec}초
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: isTablet ? 18 : 12, marginTop: 4 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <View style={{ width: isTablet ? 80 : 40, height: isTablet ? 12 : 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden" }}>
                              <View style={{ width: `${game.ballRatio * 100}%`, height: "100%", backgroundColor: "#22C55E" }} />
                            </View>
                            <Text style={[textSmall, styles.textStrong, styles.textClose]}>B</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <View style={{ width: isTablet ? 80 : 40, height: isTablet ? 12 : 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden" }}>
                              <View style={{ width: `${game.strikeRatio * 100}%`, height: "100%", backgroundColor: "#FACC15" }} />
                            </View>
                            <Text style={[textSmall, styles.textStrong, styles.textClose]}>S</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
  smallFontSizeMobile: { fontSize: 12 },
  mediumFontSizeMobile: { fontSize: 14 },
  largeFontSizeMobile: { fontSize: 20 },
  smallFontSizeTablet: { fontSize: 24 },
  mediumFontSizeTablet: { fontSize: 28 },
  largeFontSizeTablet: { fontSize: 36 },
  textTitle: { fontWeight: "700" },
  textStrong: { fontWeight: "600" },
  textNormal: { color: "#555" },
  textBlur: { color: "#999" },
  textClose: { color: "#666", fontWeight: "700" },
  textBlue: { color: "#0064FF" },
  textRed: { color: "#EF4444" },
  textGreen: { color: "#22C55E" },
  textYellow: { color: "#FACC15" },
});

export default GameStatsModal;
