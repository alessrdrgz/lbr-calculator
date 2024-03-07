const $ = (s: string) => document.querySelector(s) as HTMLElement

export const $spawnCD = $('input[name="spawn-cd"]') as HTMLInputElement
export const $essenceKill = $('input[name="essence-kill"]') as HTMLInputElement
export const $brewMulti = $('input[name="brew-multi"]') as HTMLInputElement
export const $brewCC = $('input[name="brew-cc"]') as HTMLInputElement
export const $multiCC = $('input[name="multi-cc"]') as HTMLInputElement
export const $materialStorage = $('input[name="material-storage"]') as HTMLInputElement

export const $darkEssenceKill = $('#dark-essence-kill') as HTMLSpanElement
export const $shardsKill = $('#shards-kill') as HTMLSpanElement
export const $transformationKill = $('#transformation-kill') as HTMLSpanElement
export const $fusionKill = $('#fusion-kill') as HTMLSpanElement
export const $ascensionKill = $('#ascension-kill') as HTMLSpanElement

export const $darkEssenceHour = $('#dark-essence-hour') as HTMLSpanElement
export const $shardsHour = $('#shards-hour') as HTMLSpanElement
export const $transformationHour = $('#transformation-hour') as HTMLSpanElement
export const $fusionHour = $('#fusion-hour') as HTMLSpanElement
export const $ascensionHour = $('#ascension-hour') as HTMLSpanElement

export const $essenceHour = $('#essences-hour') as HTMLSpanElement
export const $timeFillStorage = $('#time-fill-storage') as HTMLSpanElement

export const $darkEssenceBrew = $('#dark-essence-brew') as HTMLSpanElement
export const $shardsBrew = $('#shards-brew') as HTMLSpanElement
export const $transformationBrew = $('#transformation-brew') as HTMLSpanElement
export const $fusionBrew = $('#fusion-brew') as HTMLSpanElement
export const $ascensionBrew = $('#ascension-brew') as HTMLSpanElement
