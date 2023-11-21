import format from 'date-fns/format'
import calculateMoonPhases from './calculateMoonPhases'
import { currentDate } from './utils'
import visualizeMoonPhase from './visualizeMoonPhase'

const renderDate = (title, date) => {
  const dateElement = document.createElement('div')
  dateElement.classList.add('moon-phase')
  dateElement.innerHTML = `<div class="title">${title}</div>
    <div class="date">${format(date, 'MMM, d - HH:mm')}</div>`

  return dateElement
}

export function renderPage() {
  const body = document.querySelector('body')

  // Print current date.
  const moon = body.querySelector('header')

  let currentEl = moon.querySelector('.current-date')

  // @todo: Only update when changed.
  currentEl.innerText = currentDate()

  // Calculate moon phases.
  const { currentPhase, newMoon, fullMoon, nextFullMoon, nextNewMoon } =
    calculateMoonPhases()

  // The phases have been calculated. Time to remove the loader.
  const loader = body.querySelector('.loader')
  if (loader) {
    loader.remove()
  }

  // Visualize the moon.
  visualizeMoonPhase(currentPhase)

  // Visualize the next dates.
  const nextDatesElement = body.querySelector('.next-dates')

  // @todo: Only update when changed.
  nextDatesElement.innerText = ''

  if (newMoon) {
    nextDatesElement.append(renderDate('New Moon', newMoon))
  }
  if (fullMoon) {
    nextDatesElement.append(renderDate('Full Moon', fullMoon))
  }
  if (nextNewMoon) {
    nextDatesElement.append(renderDate('Next New Moon', nextNewMoon))
  }
  if (nextFullMoon) {
    nextDatesElement.append(renderDate('Next Full Moon', nextFullMoon))
  }
}
