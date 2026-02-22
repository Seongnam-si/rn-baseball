import Display from "@/components/Display";
import DisplayBanner from "@/components/DisplayBanner";
import InputWindow from "@/components/InputWindow";
import IntroModal from "@/components/IntroModal";
import Keypad from "@/components/Keypad";
import TopBanner from "@/components/TopBanner";
import useGameLogic from "@/hooks/useGameLogic";
import { useWindowDimensions, View } from "react-native";

export default function MainPage() {
  const {
    isModalOpen, gameState, resetGame, playExtraInning, endingMent,
    attempts,
    inputNumber, runJudgeResult, handleClickDeleteNumber, numLength, isCheckDone,
    handleClickNumber, 
    gameStats, attemptCount, ballRatio, strikeRatio, comNumber, sec, helpGameStart
  } = useGameLogic();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const leftColumn = (
    <View style={{ flex: 1 }}>
      <Display
        attempts={attempts}
      />
    </View>
  );

  const rightColumn = (
    <View style={{ flex: 1 }}>
      <TopBanner
        sec={sec}
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

  const tabletLayout = (
    <View style={{ flex: 1, flexDirection: "row", gap: 24, padding: 24 }}>
      {leftColumn}
      {rightColumn}
    </View>
  );

  const mobileLayout = (
    <View style={{ flex: 1 }}>
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

  return (
    <>
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
      {isTablet ? tabletLayout : mobileLayout}
    </>
  );
};
