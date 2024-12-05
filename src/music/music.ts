import { Pathfinder } from 'abstract-pathfinder'
import { Bass, BassDrum, Cymbal, Piano1, Piano2 } from './instruments'
import { setPathStr } from './Main'
import { midiToFreq } from './util'

const rand = (a = 0, b = 1) => (a + Math.random() * (b - a + 1)) | 0
const abs = (n: number) => Math.abs(n)
let ct = 0
const major = [0, 2, 4, 5, 7, 9, 11]
const makeScale = (mod = 0) => major.map((_, i) => major[(i + mod) % 7])
const vel = 0.34
const inMajorScale = (n = 0) => major.includes(n % 12)
const windowRef: any = window

export const beatDur = 0.5
let chordScale = [0]
let bar = 0

interface Generator {
  play: (
    program: any,
    freq?: number,
    vel?: number,
    time?: number,
    releaseTime?: number,
    destNode?: any
  ) => number
  now: () => number
}

export const playOneBar = (gen: Generator) => {
  playChords(gen)
  playNotes(gen)
  playDrums(gen)
  playBass(gen)
  bar++
}

// fixed 1564 chords
const playChords = (gen: Generator) => {
  const now = gen.now() + 0.05
  const relTime = now + beatDur * 3
  const prog = windowRef.progression || [1, 5, 6, 4]
  const bases = [60, 48, 60]
  chordScale = makeScale(prog[ct % 4] - 1)
  const notes = [0, 2, 4].map((n, i) => bases[i] + chordScale[n])
  notes.push(notes[0] - 12)
  notes.forEach((note) => {
    gen.play(Piano1, midiToFreq(note), vel, now, relTime)
  })
  ct = (ct + 1) % 4
}

// helpers to make the demo simpler
const chooseNoteTarget = (note: number) => {
  let tgt = note < 72 ? note + 6 : note - 6
  tgt += rand(-2, 2)
  if (!inMajorScale(tgt)) tgt++
  // if (Math.abs(tgt - note) > 8) tgt += tgt > note ? -12 : 12
  return tgt
}
const padMelody = (notes: number[]) => {
  while (notes.length % 4 > 0) notes.splice(rand(0, notes.length - 1), 0, 0)
}
const chooseNoteDur = (notes: number[], i = 0) => {
  let noteDur = beatDur * 2
  if (notes.length > 2) noteDur /= 2
  if (notes.length > 4) noteDur /= 2
  if (i < notes.length - 1 && notes[i + 1] === 0) noteDur *= 2
  return noteDur
}
const tendTowardsCenter = (note: number) => {
  note = ((72 + note) / 2) | 0
  if (!inMajorScale(note)) note++
  return note
}
const discordance = (note = 0) => {
  const loc = chordScale.indexOf(note % 12)
  if (loc < 0) return 8
  return [1, 5, 2, 3, 1, 4, 5][loc]
}

/**
 *
 *
 *
 *    melody notes via pathfinding
 */

const finder = new Pathfinder<number>({
  getNeighbors: (n) => [0, 0, 0, 0, 0, 0].map(() => n + rand(-5, 5)),
  getHeuristic: (a, b) => abs(a - b) + rand(5, 8),
  getMoveCost: (a, b) => rand(1, 4) + discordance(b),
})

//

let note = 72
const playNotes = (gen: Generator) => {
  const tgt = chooseNoteTarget(note)
  const path = finder.findPath(note, tgt)
  padMelody(path)

  path.forEach((note, i) => {
    let t = gen.now() + 0.05 + (i * beatDur * 4) / path.length
    const noteDur = chooseNoteDur(path, i)
    if (note > 0) gen.play(Piano2, midiToFreq(note), vel, t, t + noteDur)
  })

  note = tendTowardsCenter(tgt)
  setPathStr(`[${path.join(', ')}]`)
}

// for HACKIN'
windowRef.finder = finder
windowRef.rand = rand
windowRef.abs = abs
windowRef.discordance = discordance

/**
 *
 *
 *  other insruments
 */

const playDrums = (gen: Generator) => {
  const t = gen.now() + 0.05
  ;[0].forEach((beat) => {
    const bt = t + beat * beatDur
    gen.play(BassDrum, 50, 0.8, bt, bt + beatDur / 2)
  })
  ;[1, 2.5, 3].forEach((beat) => {
    const t = gen.now() + 0.05 + beat * beatDur
    gen.play(Cymbal, 80, 0.25, t, t + beatDur / 2)
  })
}

const playBass = (gen: Generator) => {
  const tgt = 34
  const tones = [0, 2, 6]
  const times = [0, 2, 3.5]
  tones.forEach((tone, i) => {
    let note = 48 + chordScale[tone]
    while (note > tgt + 12) note -= 12
    while (note < tgt) note += 12
    const t = gen.now() + 0.05 + times[i] * beatDur
    gen.play(Bass, midiToFreq(note), 0.35, t, t + beatDur * 2)
  })
}
