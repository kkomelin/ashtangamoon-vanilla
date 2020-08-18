import { addMinutes } from 'date-fns';
import { getMoonIllumination } from 'suncalc';

const numberOfDays = 31;
const currentDate = new Date();
const step = 2; // minutes

const isAboutNewMoon = (phase) => {
  return Math.round(phase) === 0;
}
const isAboutFullMoon = (phase) => {
  return phase >= 0.485 && phase <= 0.51;
}

const calculateMoonPhases = () => {
  const moonPhases = [];
  for (let i = 0; i < numberOfDays * 24 * 60; i = i + step) {
    const date = addMinutes(currentDate, i);
  
    const { phase } = getMoonIllumination(date);

    // Ignore the phase, if it's not close to new or full moon.
    if (!isAboutNewMoon(phase) && !isAboutFullMoon(phase)) {
      continue;
    }

    moonPhases.push({
      phase, 
      date
    });
  }

  let newMoon = moonPhases[0];
  let fullMoon = moonPhases[0];
  for (let i = 0; i < moonPhases.length; i++) {
    if (newMoon.phase >= moonPhases[i].phase) {
      newMoon = moonPhases[i];
    }

    if (fullMoon.phase <= moonPhases[i].phase) {
      fullMoon = moonPhases[i];
    }
  }

  const { phase } = getMoonIllumination(currentDate);

  return {
    currentPhase: phase,
    newMoon: newMoon.date,
    fullMoon: fullMoon.date
  }
}

export default calculateMoonPhases;
