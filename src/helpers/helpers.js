export function letterDensity(text) {
  const letterCounts = {};
  let totalLetters = 0;

  for (const char of text.toLowerCase()) {
    if (char >= "a" && char <= "z") {
      // Only count letters
      letterCounts[char] = (letterCounts[char] || 0) + 1;
      totalLetters++;
    }
  }

  // Convert to an array and sort by count in descending order
  return Object.entries(letterCounts)
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: ((count / totalLetters) * 100).toFixed(2) + "%",
    }))
    .sort((a, b) => b.count - a.count); // Sort from most used to least
}

export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length; // Count words
  return Math.ceil(words / wordsPerMinute); // Round up the result
};

export function toggleDarkMode(setIsDarkMode) {
  setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
    return newMode;
  });
}
