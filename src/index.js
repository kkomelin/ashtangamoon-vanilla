import moonPhases from './moonPhases';
import draw from './moon';

const body = document.querySelector('body');

body.onload = function() {
  const {currentPhase, newMoon, fullMoon} = moonPhases();
  draw(currentPhase);

  const newMoonEl = document.createElement('div');
  newMoonEl.innerText = `new: ${newMoon}`;
  body.append(newMoonEl);

  const fullMoonEl = document.createElement('div');
  fullMoonEl.innerText = `full: ${fullMoon}`;
  body.append(fullMoon);
}
