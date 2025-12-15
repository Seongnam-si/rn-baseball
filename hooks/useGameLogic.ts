import createRandomNumber from "@/utils/createRandomNumber";
import { useEffect, useState } from "react";

const useGameLogic = () => {
  const [gameMode, setGameMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [numLength, setNumLength] = useState<number>(0);
  const [comNumber, setComNumber] = useState<number[]>([]);

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
  
  return {
    isModalOpen, setIsModalOpen, setGameMode
  }
};

export default useGameLogic;
