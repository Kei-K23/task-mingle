export function startCase(inputString: string): string {
  if (!inputString) return "";

  // Split the input string into an array of words
  const words: string[] = inputString.split(/\s+/);

  // Capitalize the first letter of each word and convert others to lowercase
  const startCasedWords: string[] = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the modified words back into a single string
  const startCasedString: string = startCasedWords.join(" ");

  return startCasedString;
}
