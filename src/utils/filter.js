const removeIDs = arr => arr.map(x => {
  delete x['_id']
  return x
})

export {
  removeIDs
}
