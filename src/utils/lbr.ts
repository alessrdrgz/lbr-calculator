import { BASE_BREW, BREW_COSTS } from '@/utils/config'
import { $$, getStats, parseValue, toExponent, weightedAverage } from '@/utils/utils'
import {
  $ascensionBrew,
  $ascensionHour,
  $ascensionKill,
  $brewCC,
  $brewMulti,
  $darkEssenceBrew,
  $darkEssenceHour,
  $darkEssenceKill,
  $essenceHour,
  $essenceKill,
  $fusionBrew,
  $fusionHour,
  $fusionKill,
  $multiCC,
  $shardsBrew,
  $shardsHour,
  $shardsKill,
  $spawnCD,
  $timeFillStorage,
  $transformationBrew,
  $transformationHour,
  $transformationKill
} from './elements'

export function averageBrewValue(baseBrew: number, brewMulti: number, brewCC: number, multiCC: number) {
  return weightedAverage(
    [Math.round(baseBrew * (1 + brewMulti)), Math.round(baseBrew * (1 + brewMulti) * 2), Math.round(baseBrew * (1 + brewMulti) * 3)],
    [1 - (brewCC - multiCC) - brewCC * multiCC, brewCC - brewCC * multiCC, brewCC * multiCC]
  )
}

export const averageBrew = (baseBrew: number) => {
  const { brewMulti, brewCC, multiCC } = getStats()
  return toExponent(averageBrewValue(baseBrew, brewMulti / 100, brewCC / 100, multiCC / 100))
}

export function averageKillValue(materialPerKill: number, brewCost: number, averageBrew: number) {
  return materialPerKill / (brewCost / averageBrew)
}

export function averageKill(materialPerKill: number, brewCost: number) {
  const { brewMulti, brewCC, multiCC } = getStats()
  const averageBrew = averageBrewValue(BASE_BREW.SHARDS, brewMulti / 100, brewCC / 100, multiCC / 100)
  return toExponent(averageKillValue(materialPerKill, brewCost, averageBrew))
}

export const calculateAvgHourValue = (spawnCd: number, avgPerKill: number) => (3600 / spawnCd) * avgPerKill
export const calculateAvgHour = (spawnCd: number, avgPerKill: number) => toExponent(calculateAvgHourValue(spawnCd, avgPerKill))

export function calculateBrews() {
  $darkEssenceBrew.textContent = averageBrew(BASE_BREW.DARK_ESSENCE)
  $shardsBrew.textContent = averageBrew(BASE_BREW.SHARDS)
  $transformationBrew.textContent = averageBrew(BASE_BREW.SUPERIOR_SHARDS)
  $fusionBrew.textContent = averageBrew(BASE_BREW.SUPERIOR_SHARDS)
  $ascensionBrew.textContent = averageBrew(BASE_BREW.SUPERIOR_SHARDS)
}

export function calculateKills() {
  const essenceKill = parseValue($essenceKill.value)
  const brewMulti = parseValue($brewMulti.value) / 100
  const brewCC = parseValue($brewCC.value) / 100
  const multiCC = parseValue($multiCC.value) / 100
  const darkEssenceAverageKill = averageKillValue(
    essenceKill,
    BREW_COSTS.DARK_ESSENCE,
    averageBrewValue(BASE_BREW.DARK_ESSENCE, brewMulti, brewCC, multiCC)
  )
  $darkEssenceKill.textContent = toExponent(darkEssenceAverageKill)
  $shardsKill.textContent = averageKill(darkEssenceAverageKill, BREW_COSTS.SHARDS)
  $transformationKill.textContent = averageKill(darkEssenceAverageKill, BREW_COSTS.TRANSFORMATION)
  $fusionKill.textContent = averageKill(darkEssenceAverageKill, BREW_COSTS.FUSION)
  $ascensionKill.textContent = averageKill(darkEssenceAverageKill, BREW_COSTS.ASCENSION)
}

export function calculateHours() {
  const spawnCd = parseValue($spawnCD.value)
  const darkEssenceAverageKill = parseValue($darkEssenceKill.textContent ?? '0')
  const shardsAverageKill = parseValue($shardsKill.textContent ?? '0')
  const transformationAverageKill = parseValue($transformationKill.textContent ?? '0')
  const fusionAverageKill = parseValue($fusionKill.textContent ?? '0')
  const ascensionAverageKill = parseValue($ascensionKill.textContent ?? '0')

  $darkEssenceHour.textContent = calculateAvgHour(spawnCd, darkEssenceAverageKill)
  $shardsHour.textContent = calculateAvgHour(spawnCd, shardsAverageKill)
  $transformationHour.textContent = calculateAvgHour(spawnCd, transformationAverageKill)
  $fusionHour.textContent = calculateAvgHour(spawnCd, fusionAverageKill)
  $ascensionHour.textContent = calculateAvgHour(spawnCd, ascensionAverageKill)
}

export function calculateBrewStats() {
  calculateBrews()
  calculateKills()
  calculateHours()

  const { spawnCD, materialStorage } = getStats()
  const essencesKill = parseValue($essenceKill.value)
  const essenceHour = (3600 / spawnCD) * essencesKill
  $essenceHour.textContent = toExponent(essenceHour)

  const date = new Date(0)
  const seconds = (materialStorage / essenceHour) * 3600 ?? 0
  date.setSeconds(seconds)
  $timeFillStorage.textContent = Number.isNaN(seconds) ? '00:00:00' : date.toISOString()?.split('T')?.pop()?.split('.')[0] ?? '00:00:00'
}

export function calculateAFKTime(name: string, avgPerKillElement: HTMLInputElement | HTMLSpanElement) {
  const $$inputs = $$(`input[name="${name}-goal"]`) as Array<HTMLInputElement>
  const $input = $$inputs.find((e) => e.offsetParent != null)
  const spawnCd = parseValue($spawnCD.value)
  if ($input != null) {
    let avgPerKill

    if (avgPerKillElement instanceof HTMLInputElement) {
      avgPerKill = parseValue(avgPerKillElement.value ?? '0')
    } else {
      avgPerKill = parseValue(avgPerKillElement.textContent ?? '0')
    }

    const avgHour = calculateAvgHourValue(spawnCd, avgPerKill)
    const goal = parseValue($input.value)
    const date = new Date(0)
    const seconds = (goal / avgHour) * 3600
    date.setSeconds(seconds)
    const $$times = $$(`.time-${name}`) as Array<HTMLSpanElement>
    for (const $time of $$times) {
      $time.textContent = Number.isNaN(seconds) ? '00:00:00' : date.toISOString().split('T').pop()?.split('.')[0] ?? '00:00:00'
    }
  }
}

export function calculateAFKStats() {
  calculateAFKTime('essences', $essenceKill)
  calculateAFKTime('dark-essence', $darkEssenceKill)
  calculateAFKTime('shards', $shardsKill)
  calculateAFKTime('transformation-shards', $transformationKill)
  calculateAFKTime('fusion-shards', $fusionKill)
  calculateAFKTime('ascension-shards', $ascensionKill)
}

export function calculateStats() {
  calculateBrewStats()
  calculateAFKStats()
}
