export const makeFileSizeReadable = (size: number): string => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  console.log(i);

  return `${(size / Math.pow(1024, i)).toFixed(2)} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
};
