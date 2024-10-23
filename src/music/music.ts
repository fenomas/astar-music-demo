import { Pathfinder } from '../../../../npm-modules/abstract-pathfinder'
import { Piano1, Piano2 } from './instruments'
import { setPathStr } from './Main'
import { midiToFreq } from './util'

const rand = (a = 0, b = 1) => (a + Math.random() * (b - a + 1)) | 0
let ct = 0
const major = [0, 2, 4, 5, 7, 9, 11]
const makeChord = (n = 0) => [n, n + 2, n + 4].map((n) => major[n % 7])
const beatDur = 0.4
const vel = 0.5
const inMajorScale = (n = 0) => major.includes(n % 12)

// fixed 1564 chords
export const playChords = (gen: any) => {
  const now = gen.now() + 0.05
  const relTime = now + beatDur * 3
  const prog = [1, 5, 6, 4]
  const bases = [60, 48, 60, 60]
  const notes = makeChord(prog[ct % 4] - 1).map((n) => n + bases[ct % 4])
  notes.push(notes[0] - 12)
  notes.forEach((note) => {
    gen.play(Piano1, midiToFreq(note), vel, now, relTime)
  })
  ct = (ct + 1) % 4
}

/**
 *
 *
 *
 *    melody notes via pathfinding
 */

const finder = new Pathfinder<number>({
  getNeighbors: (n) => [0, 0, 0, 0].map(() => n + rand(-3, 3)),
  getHeuristic: (a, b) => 5 + Math.abs(a - b) + rand(0, 3),
  getMovementCost: (a, b) => Math.abs(a - b) + rand(1, 2) + (inMajorScale(b) ? 1 : 2),
})
console.log('finder')
let note = 72
export const playNotes = (gen: any) => {
  let tgt = note + rand(-6, 6)
  if (tgt === note) tgt++
  if (!inMajorScale(tgt)) tgt++
  if (Math.abs(tgt - note) > 8) tgt += tgt > note ? -12 : 12

  const path = finder.findPath(note, tgt)
  setPathStr(`[${path.join(', ')}]`)

  let noteDur = beatDur * 2
  if (path.length > 2) noteDur /= 2
  if (path.length > 4) noteDur /= 2
  let t = gen.now() + 0.05
  path.forEach((note, i) => {
    gen.play(Piano2, midiToFreq(note), vel, t, t + noteDur)
    t += noteDur
  })
  note = ((72 + tgt) / 2) | 0
  if (!inMajorScale(note)) note++
}
