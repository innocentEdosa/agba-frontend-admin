import React, { useCallback, useEffect, useRef, useState } from "react";

export type VideoStatus = "idle" | "playing" | "paused" | "stopped";

const useVideoControls = () => {
  const [status, setStatus] = useState<VideoStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
      setStatus("playing");
    }
  }, []);

  const pause = useCallback(() => {
    if (!videoRef.current?.paused || !videoRef.current?.ended) {
      videoRef.current?.pause();
      setStatus("paused");
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setStatus("stopped");
    }
  }, []);

  const mute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(true);
    }
  }, []);

  const unMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current?.canPlayType) {
      videoRef.current.controls = false;
    }
  }, []);

  return {
    ref: videoRef,
    isPlaying: status === "playing",
    isPaused: status === "paused",
    play,
    pause,
    stop,
    mute,
    unMute,
    isMuted,
  };
};

export default useVideoControls;
