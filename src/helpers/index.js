export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}