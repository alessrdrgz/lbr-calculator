export interface Stats {
  spawnCD: number
  essenceKill: number
  brewMulti: number
  brewCC: number
  multiCC: number
  materialStorage: number
}

export const DEFAULT_STATS: Stats = {
  spawnCD: 180,
  essenceKill: 0,
  brewMulti: 0,
  brewCC: 0,
  multiCC: 0,
  materialStorage: 0
}

export enum BASE_BREW {
  'DARK_ESSENCE' = 5,
  'SHARDS' = 2,
  'SUPERIOR_SHARDS' = 2
}

export enum BREW_COSTS {
  'DARK_ESSENCE' = 30,
  'SHARDS' = 50,
  'TRANSFORMATION' = 5,
  'FUSION' = 100,
  'ASCENSION' = 200
}
