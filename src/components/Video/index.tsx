import useVideoControls from "@/hooks/useVideoControls";
import styles from "./video.module.css";
import { PauseIcon, PlayIcon } from "@/Vectors";
import { useState } from "react";
import clsx from "clsx";

const VideoPlayer = ({ src = "" }: { src?: string }) => {
  const { ref: videoRef, play, pause, isPlaying } = useVideoControls();
  const [showControl, setShowControl] = useState(false);
  const handleMouseEnter = () => {
    setShowControl(false);
  };
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControl(true);
    }
  };
  return (
    <div
      className={styles.video}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <figure className={styles.playerWrapper}>
        <video
          className={styles.player}
          width="100%"
          height="100%"
          ref={videoRef}
          controls
          preload="metadata"
          src={src}></video>
      </figure>
      <button
        className={clsx(styles.playBtn, {
          [styles.hidePlayBtn]: showControl,
        })}
        onClick={isPlaying ? pause : play}>
        {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
      </button>
    </div>
  );
};

export default VideoPlayer;
