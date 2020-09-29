const difficultySeconds = (difficulty: string) => {
  let seconds = 0;
  if (difficulty === "easy") {
    seconds = 5;
  } else if (difficulty === "medium") {
    seconds = 10;
  } else {
    seconds = 20;
  }
  return seconds;
};

export const readingTime = (text: string, difficulty: string) => {
  const questionSeconds = difficultySeconds(difficulty);
  const wordsPerMinute = 150;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes * 60);
  const timerValue = questionSeconds + readTime;
  console.log(timerValue, "timerValuetimerValue");
  return timerValue;
};

export const pointsForQuestion = (difficulty: string) => {
  let points = 0;
  if (difficulty === "easy") {
    points = 5;
  } else if (difficulty === "medium") {
    points = 8;
  } else {
    points = 10;
  }
  return points;
};

export const textDecode = (text: string) => {
  let decoded = text;
  if (text.length) {
    decoded = text
      .replaceAll("&quot;", `"`)
      .replaceAll("&apos;", `'`)
      .replaceAll("&#039;", `'`)
      .replaceAll("&amp;", `&`)
      .replaceAll("&gt;", `>`)
      .replaceAll("&lt;", `<`);
  }
  return decoded;
};

export const emojiSelector = (score: number) => {
  let emoji = "neutral_face";
  if (score > 0 && score <= 20) {
    emoji = "confounded";
  } else if (score > 20 && score <= 40) {
    emoji = "pensive";
  } else if (score > 40 && score <= 70) {
    emoji = "neutral_face";
  } else if (score > 70 && score <= 90) {
    emoji = "blush";
  } else {
    emoji = "sunglasses";
  }
  return emoji;
};

export const isEmpty = (obj: object) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
