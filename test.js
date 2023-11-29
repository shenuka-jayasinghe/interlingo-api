function assignTokens(prompt){
    const sentenceRegex = /\d*\ssentences/g
    if (sentenceRegex.test(prompt)){
      const sentencePrompt = prompt.match(sentenceRegex)
      const sentencePromptArr = sentencePrompt[0].split('')
      const sentenceNumber = Number(sentencePromptArr.filter( letter => /\d/.test(letter) ).join(''))
      const tokensNeeded = 20 * sentenceNumber
      return tokensNeeded
    }
}

