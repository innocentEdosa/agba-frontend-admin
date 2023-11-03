function getPlural(count: number, word: string) {
  if (count === 1) {
    return word;
  }

  // Handle irregular plurals.
  const irregularPlurals = {
    person: "people",
    goose: "geese",
  };
  if (irregularPlurals.hasOwnProperty(word)) {
    return irregularPlurals[word as keyof typeof irregularPlurals];
  }

  // Handle words that end in "y".
  if (word.endsWith("y")) {
    return word.substring(0, word.length - 1) + "ies";
  }

  // Handle words that end in "ch", "x", or "s".
  if (word.endsWith("ch") || word.endsWith("x") || word.endsWith("s")) {
    return word + "es";
  }

  // Default to adding an "s".
  return word + "s";
}

export default getPlural;
