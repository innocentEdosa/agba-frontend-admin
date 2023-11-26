export const matchURL = (url: string, patterns: string[]) => {
  for (const pattern of patterns) {
    const regexp = new RegExp(`^${pattern}$`);
    if (regexp.test(url)) {
      return true;
    }
  }
  return false;
};
