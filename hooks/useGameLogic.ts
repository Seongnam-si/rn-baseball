import createRandomNumber from "@/utils/createRandomNumber";
import { useEffect, useState } from "react";

const useGameLogic = () => {
  const [gameMode, setGameMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [numLength, setNumLength] = useState<number>(0);
  const [comNumber, setComNumber] = useState<number[]>([]);
  const [attempts, setAttempts] = useState([]);
  const [inputNumber, setInputNumber] = useState<number[]>([]);
  const [isJudgeTrigger, setIsJudgeTrigger] = useState<boolean>(false);
  const [isCheckDone, setIsCheckDone] = useState<boolean>(false);

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
  
  return {
    isModalOpen, setIsModalOpen, setGameMode, attempts,
    inputNumber, setIsJudgeTrigger, numLength, isCheckDone, handleClickDeleteNumber,
    handleClickNumber
  }
};

export default useGameLogic;
