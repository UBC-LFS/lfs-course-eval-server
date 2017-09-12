const byTerm = (arr) => {
    const order = {
         'S1': 0,
         'SA': 1,
         'S2': 2,
         'W1': 3,
         'WA': 4,
         'W2': 5,
         'WC': 6
    } 
    return R.sort((a,b) => {
         if (a.slice(0, 4) === b.slice(0, 4)) {
              return (order[a.slice(4, 6)] < order[b.slice(4, 6)]) ? -1 : 
                     (order[a.slice(4, 6)] > order[b.slice(4, 6)]) ? 1 : 0 
         } else {
              return (a.slice(0,4) < b.slice(0,4) ? -1 : 1)
         }
    }, arr)
}

const byInstructorLastName = (arr) => {
    
}

export {
    byTerm
}