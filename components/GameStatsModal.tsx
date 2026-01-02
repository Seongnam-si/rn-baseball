import { GameRecord, loadRecentGames } from "@/utils/storageLogics";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

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

	return (
		<Modal transparent animationType="fade" visible={isVisible} onRequestClose={onClose}>
			<View
				style={{
					flex:1,
					backgroundColor: "rgba(0,0,0,0.3)",
					alignItems: "center",
					justifyContent: "center",
					padding: 16
				}}
			>
				<View
          style={{
            width: "92%",
            maxWidth: 720,
            height: "80%",
            borderRadius: 16,
            backgroundColor: "rgba(240,240,240,0.95)",
            padding: 24,
          }}
        >
					<View
						style={{ 
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center", marginBottom: 20 
						}}
					>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
							최근 10게임 통계
						</Text>
            <Pressable onPress={onClose}>
              <Text style={{ fontSize: 24, color: "#666", fontWeight: "700" }}>
								X
							</Text>
            </Pressable>
          </View>
				</View>
			</View>
		</Modal>
	);
};

export default GameStatsModal;
