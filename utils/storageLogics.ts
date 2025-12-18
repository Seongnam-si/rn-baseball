import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@game_stats";

export type GameStats = {
  totalGames: number;
  totalInnings: number;
};

export const loadGameStats = async (): Promise<GameStats> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { totalGames: 0, totalInnings: 0 };
  } catch (error) {
    console.error("게임 정보 로드 실패:", error);
    return { totalGames: 0, totalInnings: 0 };
  }
};

export const saveGameStats = async (stats: GameStats): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("게임 정보 저장 실패:", error);
  }
};

export const updateGameStats = async (currentInning: number): Promise<GameStats> => {
	const stats = await loadGameStats();
  const newStats: GameStats = {
    totalGames: stats.totalGames + 1,
    totalInnings: stats.totalInnings + currentInning,
  };
  await saveGameStats(newStats);

  return newStats;
};

export const getAverageInnings = (stats: GameStats, currentInning: number): number => {
  if (stats.totalGames <= 1) return 0;
  const previousTotalInnings = stats.totalInnings - currentInning;
  const previousTotalGames = stats.totalGames - 1;
	
  return previousTotalGames > 0 ? previousTotalInnings / previousTotalGames : 0;
};
