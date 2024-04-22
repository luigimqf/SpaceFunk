function secondsToTimerString(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  const parts = [];

  [horas, minutos, segundos].map((part) => {
    if (part > 0) {
      return parts.push(String(part).padStart(2, "0"))
    }
  });
  return parts.join(":");
}

module.exports = secondsToTimerString;
