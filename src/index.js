import format from 'date-fns/format'
import calculateMoonPhases from './calculateMoonPhases'
import './styles.css'
import visualizeMoonPhase from './visualizeMoonPhase'

const renderDate = (title, date) => {
  const dateElement = document.createElement('div')
  dateElement.classList.add('moon-phase')
  dateElement.innerHTML = `<div class="title">${title}</div>
    <div class="date">${format(date, 'MMM, d - HH:mm')}</div>`

  return dateElement
}

function renderPage() {
  const body = document.querySelector('body')

  // Print current date.
  const moon = body.querySelector('header')

  let currentEl = moon.querySelector('.current-date')

  // @todo: Only update when changed.
  currentEl.innerText = `${format(new Date(), 'd MMM yyyy')}`

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

// When body is ready, we caclulate and visualize moon phases.
window.addEventListener('load', () => {
  renderPage()

  // Re-render page regularly.
  setInterval(
    () => {
      // Check whether the app has focus.
      if (!window.document.hasFocus()) {
        return
      }

      renderPage()
    },
    1 * 60 * 1000
  ) // once a minute
})

// Service Worker for offline caching of production build.
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
    })
  }
}
