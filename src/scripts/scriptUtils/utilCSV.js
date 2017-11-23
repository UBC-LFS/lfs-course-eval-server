const sumCount = (counts) => {
  return counts.reduce((acc, cur) => {
    for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
      if (acc[scoreIndex + '']) {
        acc[scoreIndex + ''] = acc[scoreIndex + ''] + cur[scoreIndex + '']
      } else acc[scoreIndex + ''] = cur[scoreIndex + '']
    }
    return acc
  }, {})
}

export {
  sumCount
}
