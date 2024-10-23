import { createSignal } from 'solid-js'
import Generator from 'wasgen'
import { playChords, playNotes } from './music'

const [gen, setGen] = createSignal<any>(null)
const [isPlaying, setPlaying] = createSignal(false)
export const [pathStr, setPathStr] = createSignal('')

const intervals: any[] = []

const setupMusic = () => {
  if (!gen()) setGen(new Generator())
  if (!isPlaying()) {
    playChords(gen())
    intervals.push(setInterval(() => playChords(gen()), 1600))
    intervals.push(setInterval(() => playNotes(gen()), 1600))
    setPlaying(true)
  } else {
    clearInterval(intervals.pop())
    clearInterval(intervals.pop())
    setPlaying(false)
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
