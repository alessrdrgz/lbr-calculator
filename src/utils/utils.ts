import { DEFAULT_STATS, type Stats } from '@/utils/config'
import { $brewCC, $brewMulti, $essenceKill, $materialStorage, $multiCC, $spawnCD } from '@/utils/elements'
import { calculateStats } from '@/utils/lbr'
import {
  brewCCValidation,
  brewMultiValidation,
  essenceKillValidation,
  goalValidation,
  materialStorageValidation,
  multiCCValidation,
  spawnCDValidation,
  validateAll
} from '@/utils/validation'

export const $ = (s: string) => document.querySelector(s)
export const $$ = (s: string) => Array.from(document.querySelectorAll(s))

export const toExponent = (n: number) => (n < 1000 ? `${Number(n.toFixed(2))}` : n.toExponential(2).toString().replace('+', '').replace('.00', ''))

export const parseValue = (v: string) =>
  v.includes('e') ? parseFloat(v.split('e').shift() ?? '0') * Math.pow(10, parseInt(v.split('e').pop() ?? '1')) : parseFloat(v)

export function weightedAverage(values: number[], weights: number[]) {
  const result = values.map((value, i) => [value * weights[i], weights[i]]).reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0])
  return result[0] / result[1]
}

export function getStats() {
  return {
    spawnCD: parseValue($spawnCD.value),
    essenceKill: parseValue($essenceKill.value),
    brewMulti: parseValue($brewMulti.value),
    brewCC: parseValue($brewCC.value),
    multiCC: parseValue($multiCC.value),
    materialStorage: parseValue($materialStorage.value)
  }
}

export const debounce = (fn: Function, delay: number) => {
  let timer = 0

  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

export function saveStats() {
  const stats: Stats = getStats()
  localStorage.setItem('lbr-witch-afk-calculator', JSON.stringify(stats))

  const $saveToast = $('#save-toast') as HTMLDivElement
  $saveToast.classList.remove('hidden')
  setTimeout(() => {
    $saveToast.classList.add('hidden')
  }, 3000)
}

export function loadStats() {
  const storageData = localStorage.getItem('lbr-witch-afk-calculator')
  const stats: Stats = storageData != null ? JSON.parse(storageData) : DEFAULT_STATS

  $spawnCD.value = stats.spawnCD.toString()
  $essenceKill.value = toExponent(stats.essenceKill)
  $brewMulti.value = stats.brewMulti.toString()
  $brewCC.value = stats.brewCC.toString()
  $multiCC.value = stats.multiCC.toString()
  $materialStorage.value = toExponent(stats.materialStorage)

  validateAll()
  calculateStats()
}

interface InputEvent extends Event {
  target: HTMLInputElement
}

export function inputHandler(event: Event) {
  const { target } = event as InputEvent

  switch (target.name) {
    case 'spawn-cd':
      spawnCDValidation(target)
      break

    case 'essence-kill':
      essenceKillValidation(target)
      break

    case 'brew-multi':
      brewMultiValidation(target)
      break

    case 'brew-cc':
      brewCCValidation(target)
      break

    case 'multi-cc':
      multiCCValidation(target)
      break

    case 'material-storage':
      materialStorageValidation(target)
      break

    case 'essences-goal':
    case 'shards-goal':
    case 'dark-essence-goal':
    case 'transformation-shards-goal':
    case 'fusion-shards-goal':
    case 'ascension-shards-goal':
      goalValidation(target)
      break

    default:
      console.log(target.name)
  }

  calculateStats()
}
