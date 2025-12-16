export type JudgeResult = {
	strike: number;
  ball: number;
  out: number;
};

export type Attempt = {
  id: number;
  inputNumber: number[];
  roundResult: JudgeResult;
};
