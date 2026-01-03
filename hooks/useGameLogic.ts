import { Attempt } from "@/types/types";
import chooseEndingMent from "@/utils/chooseEndingMent";
import createRandomNumber from "@/utils/createRandomNumber";
import judgeResult from "@/utils/judgeResult";
import { addGameRecord, GameStats, loadGameStats, updateGameStats } from "@/utils/storageLogics";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useGameLogic = () => {
  const [isJudgeTrigger, setIsJudgeTrigger] = useState<boolean>(false);
  const [isCheckDone, setIsCheckDone] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [inputNumber, setInputNumber] = useState<number[]>([]);
  const [comNumber, setComNumber] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [gameMode, setGameMode] = useState<string>("");
  const [gameState, setGameState] = useState<"intro" | "win" | "lose" | "extralose">("intro");
  const [numLength, setNumLength] = useState<number>(0);
  const [inning, setInning] = useState<number>(11);
  const [accumCount, setAccumCount] = useState({
    ball: 0,
    strike: 0,
    out: 0
  });
  const [endingMent, setEndingMent] = useState<string>("");
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  useEffect(() => {
    loadGameStats().then(setGameStats);
  }, []);

  useEffect(() => {
    if (gameMode) {
      const length = gameMode === "normal" ? 3 : 4;

      if (length) {
        setNumLength(length);
        setComNumber(createRandomNumber(length));
        setIsModalOpen(false);
      }
    }
  }, [gameMode]);

  useEffect(() => {
    if (isJudgeTrigger && inputNumber.length !== 0 && attemptCount < inning) {
      const returnResult = judgeResult(comNumber, inputNumber);

      setAttempts((prev) => [
        {
          id: prev.length + 1,
          inputNumber: inputNumber,
          roundResult: returnResult,
        },
        ...prev
      ]);

      setAccumCount(prev => ({
        strike: prev.strike + returnResult.strike,
        ball: prev.ball + returnResult.ball,
        out: prev.out + returnResult.out,
      }));

      setInputNumber([]);
      setAttemptCount(prev => prev + 1);

      if (returnResult.strike === numLength) {
        const currentInning = attemptCount + 1;
        const totalBall = accumCount.ball + returnResult.ball;
        const totalStrike = accumCount.strike + returnResult.strike;
        const totalInputs = currentInning * numLength;

        setGameState("win");
        setEndingMent(chooseEndingMent(inning));
        updateGameStats(currentInning).then((newStats) => {
          setGameStats(newStats);
        });
        addGameRecord({
          result: "win",
          innings: currentInning,
          ballRatio: totalInputs > 0 ? totalBall / totalInputs : 0,
          strikeRatio: totalInputs > 0 ? totalStrike / totalInputs : 0,
          numLength,
          timestamp: Date.now(),
        });
        
        setIsModalOpen(true);
      }
    }

    setIsJudgeTrigger(false);
  }, [isJudgeTrigger]);

  useEffect(() => {
    if (attemptCount > inning - 1) {
      if (gameState !== "win") {
        if (inning === 18) {
          setGameState("extralose");
        } else {
          setGameState("lose");
        }
        const currentInning = attemptCount;
        const totalInputs = currentInning * numLength;
        const totalBall = accumCount.ball;
        const totalStrike = accumCount.strike;
        
        updateGameStats(currentInning).then((newStats) => {
          setGameStats(newStats);
        });
        addGameRecord({
          result: inning === 18 ? "extralose" : "lose",
          innings: currentInning,
          ballRatio: totalInputs > 0 ? totalBall / totalInputs : 0,
          strikeRatio: totalInputs > 0 ? totalStrike / totalInputs : 0,
          numLength,
          timestamp: Date.now(),
        });
      }
      setIsModalOpen(true);
    }
  }, [attemptCount, gameState, inning]);

  useEffect(() => {
    if (inputNumber.length === numLength && numLength > 0) {
      setIsCheckDone(true);
    } else {
      setIsCheckDone(false);
    }
  }, [inputNumber, numLength]);

  const resetGame = () => {
    setIsModalOpen(true);
    setInputNumber([]);
    setAttempts([]);
    setAttemptCount(0);
    setGameState("intro");
    setGameMode("");
    setInning(11);
    setAccumCount({
      ball: 0,
      strike: 0,
      out: 0
    });
    setComNumber([]);
    router.replace("/");
  };

  const handleClickDeleteNumber = () => {
    setInputNumber(prevNum => (
      prevNum.length > 0 ? prevNum.slice(0, -1) : prevNum
    ));
  };

  const handleClickNumber = (num: number) => {
    setInputNumber(prevNum =>
      ((prevNum.length < numLength) && (!prevNum.includes(num))) ?
        [...prevNum, num] :
        prevNum
    );
  };

  const playExtraInning = () => {
    setInning(18);
    setIsModalOpen(false);
  }
  
  return {
    isModalOpen, setIsModalOpen, gameState, setGameMode, attempts, endingMent,
    inputNumber, setIsJudgeTrigger, numLength, isCheckDone, handleClickDeleteNumber,
    handleClickNumber, resetGame, playExtraInning,
    gameStats, attemptCount
  }
};

export default useGameLogic;
