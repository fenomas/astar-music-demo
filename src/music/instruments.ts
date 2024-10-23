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
