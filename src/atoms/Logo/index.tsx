import Link from "next/link";
import Image from "next/image";
import styles from "./logo.module.css";

const Logo = ({ width = 65, height = 32 }) => {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        width={width}
        height={height}
        src={"/logo-coloured.png"}
        alt="logo"
        priority
      />
    </Link>
  );
};

export default Logo;
