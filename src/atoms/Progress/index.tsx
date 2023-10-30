import React, { useId } from "react";
import style from "./progress.module.css";

type ProgressBarProps = {
  percentage: number;
  label: string;
};

const ProgressBar = ({ percentage, label }: ProgressBarProps) => {
  const labe_id = useId();
  return (
    <div className={style.wrapper}>
      <div
        className={style.progress}
        role="meter"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percentage}
        aria-aria-labelledby="">
        <div
          className={style.progressBar}
          style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={style.progressInfo}>
        <p id={labe_id}>{label}</p>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
