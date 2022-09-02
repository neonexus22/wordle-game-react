export const boardDefault: string[][] = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

export const generateWordSet = async () => {
  let wordSet = new Set()
  let todaysWord = 'RIGHT'
  await fetch('/wordle-bank.txt')
    .then((res) => res.text())
    .then((result) => {
      const wordArray = result.split('\n')
      todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
      wordSet = new Set(wordArray)
    })
  return { wordSet, todaysWord }
}
