const sunCalc = require('suncalc');
const addMinutes = require('date-fns/addMinutes');
// const format = require('date-fns/format');
const { format } = require('date-fns-tz');

const timeZone = 'Europe/Moscow';
const numberOfDays = 31;
const currentDate = new Date();

const isAboutNewMoon = (phase) => {
  return Math.round(phase) === 0;
}
const isAboutFullMoon = (phase) => {
  return phase >= 0.49 && phase <= 0.51;
}

const calculateNextNewAndFull = () => {
  const moonPhases = [];
  for(let i = 0; i < numberOfDays * 24 * 60; i++) {
    const date = addMinutes(currentDate, i);
  
    const { phase } = sunCalc.getMoonIllumination(date);

    // Ignore the phase, if it's not close to new or full moon.
    if (!isAboutNewMoon(phase) && !isAboutFullMoon(phase)) {
      continue;
    }

    moonPhases.push({
      phase, 
      date: format(date, "yyyy-MM-dd HH:mm", { timeZone })
    });
  }
  
  console.log(moonPhases.length);

  const newMoon = moonPhases.reduce((prev, current) => 
    (prev.phase < current.phase && isAboutNewMoon(prev.phase)) ? prev : current
  );
  
  const fullMoon = moonPhases
    .filter(item => isAboutFullMoon(item.phase))
    .reduce((prev, current) => {
      return (prev.phase > current.phase) ? prev : current;
    });

  return {
    new: newMoon.date,
    full: fullMoon.date
  }
}

module.exports = {
  calculateNextNewAndFull
}
