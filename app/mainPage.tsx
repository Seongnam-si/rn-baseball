import IntroModal from "@/components/modal";
import useGameLogic from "@/hooks/useGameLogic";

export default function MainPage() {
  const {
    isModalOpen, setIsModalOpen, setGameMode
  } = useGameLogic();

  return (
    <>
      <IntroModal
        modalState={isModalOpen}
        gameModeSetter={setGameMode}
      />
    </>
  );
};
