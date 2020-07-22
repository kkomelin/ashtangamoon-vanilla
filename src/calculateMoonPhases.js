import { addMinutes } from 'date-fns';
import sunCalc from 'suncalc';

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

const calculateMoonPhases = () => {
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
      date
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
    newMoon: newMoon.date,
    fullMoon: fullMoon.date
  }
}

export default calculateMoonPhases;
