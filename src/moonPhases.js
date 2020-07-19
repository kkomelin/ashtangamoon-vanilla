import { addMinutes, format } from 'date-fns';
import sunCalc from 'suncalc';
// const { format } = require('date-fns-tz');

const timeZone = 'Europe/Moscow';
const numberOfDays = 31;
const currentDate = new Date();

const isAboutNewMoon = (phase) => {
  return Math.round(phase) === 0;
}
const isAboutFullMoon = (phase) => {
  return phase >= 0.49 && phase <= 0.51;
}

const getMoonPhase = (date) => {
  const { phase } = sunCalc.getMoonIllumination(date);
  return phase;
}

const moonPhases = () => {
  const moonPhases = [];
  for(let i = 0; i < numberOfDays * 24 * 60; i++) {
    const date = addMinutes(currentDate, i);
  
    const phase = getMoonPhase(date);

    // Ignore the phase, if it's not close to new or full moon.
    if (!isAboutNewMoon(phase) && !isAboutFullMoon(phase)) {
      continue;
    }

    moonPhases.push({
      phase, 
      date: format(date, "yyyy-MM-dd HH:mm", { timeZone })
    });
  }

  const newMoon = moonPhases.reduce((prev, current) => 
    (prev.phase < current.phase && isAboutNewMoon(prev.phase)) ? prev : current
  );
  
  const fullMoon = moonPhases
    .filter(item => isAboutFullMoon(item.phase))
    .reduce((prev, current) => {
      return (prev.phase > current.phase) ? prev : current;
    });

  const currentPhase = getMoonPhase(currentDate);

  return {
    currentPhase,
    new: newMoon.date,
    full: fullMoon.date
  }
}

export default moonPhases;
