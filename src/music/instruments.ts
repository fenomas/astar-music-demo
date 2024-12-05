export const Piano1 = {
  type: 'sine',
  freq: { type: 'triangle', gain: { t: 3, a: 0.01, h: 0.01, d: 0.7, s: 0.1, r: 0.05, k: -1.2 } },
  gain: { t: 0.4, a: 0.005, h: 0.01, d: 0.7, s: 0 },
}

export const Piano2 = {
  type: 'triangle',
  freq: {
    type: 'triangle',
    freq: { t: 3 },
    gain: { t: 4, a: 0.01, h: 0.01, d: 0.4, s: 0.1, r: 0.05, k: -1 },
  },
  gain: { t: 0.4, a: 0.005, h: 0.01, d: 0.7, s: 0 },
}

export const Bass = {
  type: 'sine',
  freq: [{ type: 'sine', freq: { t: 3 }, gain: { t: 4, a: 0, h: 0.01, d: 1, s: 1, r: 0.05 } }],
  gain: { t: 0.5, a: 0.002, h: 0.01, d: 0.3, s: 0.01, r: 0.05 },
}

export const Cymbal = {
  type: 'n0',
  freq: { p: 0.9, q: 1 },
  gain: { t: 0.2, a: 0.005, h: 0.01, d: 0.05, s: 0, r: 0.05 },
}

export const BassDrum = {
  type: 'triangle',
  freq: [
    { p: 0.5 },
    { type: 'n0', freq: { t: 5, p: 0 }, gain: { t: 0, a: 0, d: 0.01, s: 0, r: 0.01 } },
  ],
  gain: {  a: 0.005, h: 0.03, d: 0.05, s: 0, r: 0.05 },
}
