type JudgeResult = {
	ball: number;
	strike: number;
	out: number;
};

const judgeResult = (comNum: number[], userNum: number[]): JudgeResult => {
	let result = {
		ball: 0,
		strike: 0,
		out: 0
	};

	userNum.forEach((userDigit, userIndex) => {
		const comIndex = comNum.indexOf(userDigit);

		if (comIndex !== -1) {
			if (userIndex === comIndex) {
				result.strike++;
			} else {
				result.ball++;
			}
		} else {
			result.out++;
		}
	});

	return result;
};

export default judgeResult;
