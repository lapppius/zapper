export function getDuration(player) {
  if (!player) return null;

  // first load
  if (player.buffered.length == 0) return 0;

  // on live streams duration is Infinity
  if (player.duration === Infinity && player.seekable.length > 0) {
    return player.buffered.end(player.buffered.length - 1);
    // return player.seekable.end(player.seekable.length - 1);
  } else {
    return player.duration;
  }
}
