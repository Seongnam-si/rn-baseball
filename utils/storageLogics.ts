import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@game_stats";
const RECENT_GAME_KEY = "@recent_game";

export type GameStats = {
  totalGames: number;
  totalInnings: number;
};

export type GameRecord = {
  result: "win" | "lose" | "extralose";
  innings: number;
  ballRatio: number;
  strikeRatio: number;
  numLength: number;
  timestamp: number;
  sec: number;
}

export type RecentGames = {
  games: GameRecord[];
}

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

export const loadRecentGames = async (): Promise<RecentGames> => {
  try {
    const data = await AsyncStorage.getItem(RECENT_GAME_KEY);
    if (data) {
      const parsed = JSON.parse(data) as RecentGames;
      const games = Array.isArray(parsed.games)
        ? parsed.games.map((game) => ({
            ...game,
            sec: typeof game.sec === "number" ? game.sec : 0,
          }))
        : [];
      return { games };
    }
    return { games: [] };
  } catch (error) {
    console.error("최근 게임 기록 로드 실패", error);
    return { games: [] };
  }
};

export const saveRecentGames = async (recentGames: RecentGames): Promise<void> => {
  try {
    await AsyncStorage.setItem(RECENT_GAME_KEY, JSON.stringify(recentGames));
  } catch (error) {
    console.error("최근 게임 기록 저장 실패:", error);
  }
};

export const addGameRecord = async (record: GameRecord): Promise<RecentGames> => {
  const recentGames = await loadRecentGames();
  const newGames = [record, ...recentGames.games].slice(0, 10);
  const updated: RecentGames = { games: newGames };

  await saveRecentGames(updated);
  return updated;
};
