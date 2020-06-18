export const createKeyword = text => {
  const keywordArray = []
  const wordArray = text.match(/("[^"]+"|[^"\s]+)/g)

  wordArray.forEach(word => {
    let shortWord = ''

    word.split('').forEach(letter => {
      shortWord += letter
      keywordArray.push(shortWord.toLowerCase())
    })
  })

  let shortWord = ''

  text.split('').forEach(letter => {
    shortWord += letter
    keywordArray.push(shortWord)
  })

  return keywordArray
}
