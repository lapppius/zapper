import { patterns, matches } from "./patterns";

export async function getMimeType(url) {
  // try {
  //   return await getExtensionFromURL(url);
  // } catch (error) {
  // first make a HEAD request
  return await fetch(url, {
    method: "HEAD",
  })
    .then((headRes) => {
      if (!headRes.ok) {
        //make a GET request
        console.info("Attempting GET request");
        return fetch(url, {
          method: "GET",
          mode: "no-cors",
          headers: {},
        }).then((getRes) => {
          if (!getRes.ok) {
            //throw Error
            throw new Error("Failed to fetch stream");
          } else {
            return getRes.headers.get("Content-Type");
          }
        });
      } else {
        return headRes.headers.get("Content-Type");
      }
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  // }
}

export async function getExtensionFromURL(url) {
  try {
    for (const pattern of Object.keys(patterns)) {
      if (matches(patterns[pattern], url)) {
        return pattern;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
