// Convert milliseconds to seconds
export function msToSec(ms) {
  return Math.floor(ms / 1000);
}
//Convert seconds to hours
export function secToHr(secs) {
  return Math.floor(secs / 3600);
}

export function formatSecondsAsTime(secs) {
  if (secs == Infinity) {
    return null;
  }
  var hr = secToHr(secs);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (hr < 1) {
    return min + ":" + sec;
  } else {
    return hr + ":" + min + ":" + sec;
  }
}

export function formatMillisecondsAsTime(ms) {
  if (ms == Infinity) {
    return null;
  }
  var secs = msToSec(ms);
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (hr < 1) {
    return min + ":" + sec;
  } else {
    return hr + ":" + min + ":" + sec;
  }
}
