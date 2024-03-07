import { $brewCC, $brewMulti, $essenceKill, $materialStorage, $multiCC, $spawnCD } from '@/utils/elements'
import { $$, parseValue, toExponent } from '@/utils/utils'

export function spawnCDValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value > 180 ? '180' : value < 145 ? '145' : value.toString()
}

export function essenceKillValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value < 0 ? '0' : toExponent(value)
}

export function brewMultiValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value < 0 ? '0' : value.toString()
}

export function brewCCValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value < 0 ? '0' : value > 100 ? '100' : value.toString()
  if (value > 100) {
    const diff = value - 100
    $multiCC.value = (parseInt($multiCC.value) + diff).toString()
  }
}

export function multiCCValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value < 0 ? '0' : value.toString()
}

export function materialStorageValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  element.value = value < 0 ? '' : toExponent(value)
}

export function goalValidation(element: HTMLInputElement) {
  const value = parseValue(element.value)
  const $$inputs = $$(`input[name="${element.name}"]`) as Array<HTMLInputElement>
  for (const $input of $$inputs) {
    $input.value = value < 0 ? '0' : toExponent(value)
  }
}

export function validateAll() {
  spawnCDValidation($spawnCD)
  essenceKillValidation($essenceKill)
  brewMultiValidation($brewMulti)
  brewCCValidation($brewCC)
  multiCCValidation($multiCC)
  materialStorageValidation($materialStorage)
}
