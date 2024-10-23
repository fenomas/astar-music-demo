import { render } from 'solid-js/web'
import { Main } from './music/Main'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error('Root element not found.')
}

render(
  () => (
    <main>
      <h2>A* Music Demo!</h2>
      <Main />
    </main>
  ),
  root!
)
