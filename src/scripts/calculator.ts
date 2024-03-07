import { $, $$, debounce, inputHandler, loadStats, saveStats } from '@/utils/utils'

const $saveButton = $('#save-btn') as HTMLButtonElement
const inputs = $$('input') as Array<HTMLInputElement>

inputs.forEach((input) => {
  input.addEventListener('focusout', inputHandler)
})

$saveButton.addEventListener('click', debounce(saveStats, 500))

loadStats()
