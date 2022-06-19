import format from 'date-fns/format';
import calculateMoonPhases from './calculateMoonPhases';
import './styles.css';
import visualizeMoonPhase from './visualizeMoonPhase';

const body = document.querySelector('body');

const renderDate = (title, date) => {
  const dateElement = document.createElement("div");
  dateElement.classList.add("moon-phase");
  dateElement.innerHTML = `<div class="title">${title}</div>
    <div class="date">${format(date, "MMM, d - HH:mm")}</div>`;

  return dateElement;
};

// When body is ready, we caclulate and visualize moon phases.
body.onload = function () {
  // Print current date.
  const moon = body.querySelector("header");
  const currentEl = document.createElement("div");
  currentEl.classList.add("current-date");
  currentEl.innerText = `${format(new Date(), "d MMM yyyy")}`;
  moon.append(currentEl);

  // Calculate moon phases.
  const { currentPhase, newMoon, fullMoon, nextFullMoon, nextNewMoon } =
    calculateMoonPhases();

  // The phases have been calculated. Time to remove the loader.
  body.querySelector(".loader").remove();

  // Visualize the moon.
  visualizeMoonPhase(currentPhase);

  // Visualize the next dates.
  const nextDatesElement = body.querySelector(".next-dates");

  if (newMoon) {
    nextDatesElement.append(renderDate("New Moon", newMoon));
  }
  if (fullMoon) {
    nextDatesElement.append(renderDate("Full Moon", fullMoon));
  }
  if (nextNewMoon) {
    nextDatesElement.append(renderDate("Next New Moon", nextNewMoon));
  }
  if (nextFullMoon) {
    nextDatesElement.append(renderDate("Next Full Moon", nextFullMoon));
  }

  // if (newMoon < fullMoon) {
  //   nextDatesElement.append(newMoonEl);
  //   nextDatesElement.append(fullMoonEl);
  // }
  // else {
  //   nextDatesElement.append(fullMoonEl);
  //   nextDatesElement.append(newMoonEl);
  // }
};

// Service Worker for offline caching of production build.
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}
