import { GameRecord, loadRecentGames } from "@/utils/storageLogics";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type GameStatsModalProps = {
	isVisible: boolean;
	onClose: () => void;
}

const GameStatsModal = ({ isVisible, onClose }: GameStatsModalProps) => {
	const [recentGames, setRecentGames] = useState<GameRecord[]>([]);

  useEffect(() => {
		if (isVisible) {
			loadRecentGames().then((data) => {
				setRecentGames(data.games);
			});
		}
	}, [isVisible]);

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

	return (
		<Modal transparent animationType="fade" visible={isVisible} onRequestClose={onClose}>
			<View style={{ flex:1, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center", padding: 16 }}>
				<View style={{ width: "92%", maxWidth: 720, height: "80%", borderRadius: 16, backgroundColor: "rgba(240,240,240,0.95)", padding: 24}}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
							최근 10게임 통계
						</Text>
            <Pressable onPress={onClose}>
              <Text style={{ fontSize: 24, color: "#666", fontWeight: "700" }}>
								X
							</Text>
            </Pressable>
          </View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
							<Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>요약</Text>
							<View style={{ gap: 8 }}>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
									<Text style={{ fontSize: 14, color: "#555" }}>승리</Text>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#0064FF" }}>{winCount}회</Text>
								</View>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, color: "#555" }}>패배</Text>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#EF4444" }}>{loseCount}회</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, color: "#555" }}>평균 이닝</Text>
                  <Text style={{ fontSize: 14, fontWeight: "600" }}>{avgInnings.toFixed(1)}이닝</Text>
                </View>
								<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, color: "#555" }}>평균 볼 비율</Text>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#22C55E" }}>
                    {(avgBallRatio * 100).toFixed(1)}%
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, color: "#555" }}>평균 스트라이크 비율</Text>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#FACC15" }}>
                    {(avgStrikeRatio * 100).toFixed(1)}%
                  </Text>
                </View>
							</View>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

export default GameStatsModal;
