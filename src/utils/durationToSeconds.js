function durationToSeconds(duration) {
  const splitedTime = duration.split(":");

  if (splitedTime.length === 3) {
    const [hours, minutes, seconds] = splitedTime;
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  }

  const [minutes, seconds] = splitedTime;
  return Number(minutes) * 60 + Number(seconds);
}

module.exports = durationToSeconds;