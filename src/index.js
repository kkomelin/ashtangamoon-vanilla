import { renderPage } from './render'
import './styles.css'

// When body is ready, we calculate and visualize moon phases.
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
