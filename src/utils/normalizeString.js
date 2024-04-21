export default async function normalizeString(string) {
  // Normalize the string to remove diacritics

  try {
    const normalizedString = await string
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    console.log(normalizedString);
  } catch (error) {
    console.error("Unable to normalize the string", string, error);
  }
}
