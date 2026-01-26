import Display from "@/components/Display";
import DisplayBanner from "@/components/DisplayBanner";
import InputWindow from "@/components/InputWindow";
import IntroModal from "@/components/IntroModal";
import Keypad from "@/components/Keypad";
import TopBanner from "@/components/TopBanner";
import useGameLogic from "@/hooks/useGameLogic";
import { View } from "react-native";

export default function MainPage() {
  const {
    isModalOpen, gameState, resetGame, playExtraInning, endingMent,
    attempts,
    inputNumber, runJudgeResult, handleClickDeleteNumber, numLength, isCheckDone,
    handleClickNumber, 
    gameStats, attemptCount, ballRatio, strikeRatio, comNumber, sec, helpGameStart
  } = useGameLogic();

  return (
    <View className="flex-1">
      <IntroModal
        modalState={isModalOpen}
        gameState={gameState}
        onRestart={resetGame}
        playExtraInning={playExtraInning}
        endingMent={endingMent}
        gameStats={gameStats}
        currentInning={attemptCount + 1}
        ballRatio={ballRatio}
        strikeRatio={strikeRatio}
        comNumber={comNumber}
        sec={sec}
        helpGameStart={helpGameStart}
      />
      <TopBanner
        sec={sec}
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
        runJudgeResult={runJudgeResult}
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
