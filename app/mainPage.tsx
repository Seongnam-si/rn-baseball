import Display from "@/components/Display";
import DisplayBanner from "@/components/DisplayBanner";
import InputWindow from "@/components/InputWindow";
import IntroModal from "@/components/IntroModal";
import Keypad from "@/components/Keypad";
import useGameLogic from "@/hooks/useGameLogic";
import { View } from "react-native";

export default function MainPage() {
  const {
    isModalOpen, setGameMode, gameState, resetGame, playExtraInning,
    attempts,
    inputNumber, setIsJudgeTrigger, handleClickDeleteNumber, numLength, isCheckDone,
    handleClickNumber, 
  } = useGameLogic();

  return (
    <View className="flex-1">
      <IntroModal
        modalState={isModalOpen}
        gameModeSetter={setGameMode}
        gameState={gameState}
        onRestart={resetGame}
        playExtraInning={playExtraInning}
      />
      <Display
        attempts={attempts}
      />
      <DisplayBanner
        modalState={isModalOpen}
        attempts={attempts}
      />
      <InputWindow
        userNumber={inputNumber}
        judgeTriggerSetter={() => setIsJudgeTrigger(true)}
        deleteNumberSetter={handleClickDeleteNumber}
        numLength={numLength}
        enterActivate={isCheckDone}
      />
      <Keypad
        numberSetter={handleClickNumber}
      />
    </View>
  );
};
