import { DisplayBannerProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";

type ContentType =
  | { type: "playball" }
  | { type: "ball"; ballCount: number }
  | { type: "strike"; strikeCount: number }
  | { type: "mixed"; ballCount: number; strikeCount: number };

const useBannerLogic = ({ modalState, attempts }: DisplayBannerProps) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
  const [contentType, setContentType] = useState<ContentType>({ type: "playball" });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownRef = useRef(false);
  const lastAttemptIdRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const showKeeper = (ms: number) => {
    setIsVisible(true);
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      timeoutRef.current = null;
    }, ms);
  };

  useEffect(() => {
    const latestAttempt = attempts && attempts.length > 0 ? attempts[0] : null;

    if (!modalState && !hasShownRef.current) {
      setContentType({ type: "playball" });
      showKeeper(5000);
      hasShownRef.current = true;
      return;
    }

    if (modalState) {
      clearTimer();
      setIsVisible(false);

      if (!attempts || attempts.length === 0) {
        hasShownRef.current = false;
        lastAttemptIdRef.current = null;
        setContentType({ type:"playball" });
      }
      return;
    }

    if (!modalState && latestAttempt) {
      if (latestAttempt.id === lastAttemptIdRef.current) return;

      lastAttemptIdRef.current = latestAttempt.id;
      const roundResult = latestAttempt.roundResult;
      if (!roundResult) return;

      const ball = roundResult.ball ?? 0;
      const strike = roundResult.strike ?? 0;
      const hasball = ball > 0;
      const hasstrike = strike > 0;

      if (!hasball && !hasstrike) {
        clearTimer();
        setIsVisible(false);
        return;
      }

      if (hasball && hasstrike) {
        setContentType({ type: "mixed", ballCount: ball, strikeCount: strike });
      } else if (hasball) {
        setContentType({ type: "ball", ballCount: ball });
      } else {
        setContentType({ type: "strike", strikeCount: strike });
      }

      showKeeper(5000);
    }
  }, [modalState, attempts]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return { isVisible, contentType };
};

export default useBannerLogic;
