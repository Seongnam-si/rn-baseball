const mentArray = [
	"오늘 감각이 날카로웠어요 🔥",
	"안정적인 플레이였어요 👍",
	"끝까지 포기하지 않았어요 💪"
]

const chooseEndingMent = (inning: number): string => {
	if (inning <= 5) return mentArray[0];
	if (inning <= 11) return mentArray[1];
	return mentArray[2];
};

export default chooseEndingMent;
