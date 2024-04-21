// flags https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags

export const patterns = {
  DASH_EXTENSIONS: ".mpd",
  HLS_EXTENSIONS: ".m3u8",
};

export function matches(pattern, input) {
  // if (!(pattern instanceof RegExp)) {
  //   throw new Error(
  //     `Invalid pattern '${pattern}': Pattern is not a regular expression.`
  //   );
  // }

  if (typeof input !== "string") {
    throw new Error("Invalid input: Input must be a string.");
  }

  return input.includes(pattern);
}
