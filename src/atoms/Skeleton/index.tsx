import styles from "./skeleton.module.css";

type Props = {
  style?: React.CSSProperties;
};

const Skeleton = ({ style }: Props) => {
  return <div style={style} className={styles.wrapper} />;
};

export default Skeleton;
