import format from 'date-fns/format';
import draw from './moon';
import moonPhases from './moonPhases';

const body = document.querySelector('body');

body.onload = function() {
  const {currentPhase, newMoon, fullMoon} = moonPhases();
  draw(currentPhase);

  const next = body.querySelector('.next-dates');

  const newMoonEl = document.createElement('div');
  newMoonEl.classList.add('new-moon-caption');
  newMoonEl.innerHTML = `<div class="caption-title">New Moon</div>
    ${format(newMoon, 'MMM, d - HH:mm')}`;

  const fullMoonEl = document.createElement('div');
  fullMoonEl.classList.add('full-moon-caption');
  fullMoonEl.innerHTML = `<div class="caption-title">Full Moon</div>
    ${format(fullMoon, 'MMM, d - HH:mm')}`;

  if (newMoon < fullMoon) {
    next.append(newMoonEl);
    next.append(fullMoonEl);
  }
  else {
    next.append(fullMoonEl);
    next.append(newMoonEl);
  }
}
