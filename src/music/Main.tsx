import Generator from 'wasgen'
import { createSignal } from 'solid-js'
import { beatDur, playOneBar } from './music'

const [isPlaying, setPlaying] = createSignal(false)
export const [pathStr, setPathStr] = createSignal('')

let interval: any
let gen: any

const setupMusic = () => {
  if (!gen) gen = new Generator()
  if (!isPlaying()) {
    playOneBar(gen)
    interval = setInterval(playOneBar, beatDur * 4 * 1000, gen)
    setPlaying(true)
  } else {
    setPlaying(false)
    clearInterval(interval)
  }
}

export const Main = () => {
  return (
    <div>
      <button onclick={setupMusic}>{isPlaying() ? 'Stop' : 'Start'}</button>
      <br />
      <br />
      <pre style={{ 'font-size': '200%' }}>Path: {pathStr()}</pre>
    </div>
  )
}
