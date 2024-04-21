export default async function extractWords(sentence) {
  try {
    // Regular expression to match words (sequences of letters, including Greek letters)
    const wordRegex = /[a-zA-Zα-ωΑ-Ω]+/g;
    // Extract words using match() function
    const words = await sentence.match(wordRegex);
    return words;
  } catch (error) {
    return null;
  }
}
