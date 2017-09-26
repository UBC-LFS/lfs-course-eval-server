const getYear = (ev) => {
    const arr = ev.surveyname.split(' ')
    const length = ev.surveyname.split(' ').length
    return Number(arr[length-1].slice(0,4))
}

const getTerm = (ev) => {
    const arr = ev.surveyname.split(' ')
    const length = ev.surveyname.split(' ').length
    return arr[length-1].slice(4,6)
}

const getCourse = (ev) => {
    const courseNum = ev.crsnum
    return courseNum.split(' ').slice(0, courseNum.split(' ').length - 1).join(' ')
}

const getSection = (ev) => {
    const courseNum = ev.crsnum
    const arr = courseNum.split(' ')
    const length = arr.length
    return arr[length-1]
}

const getDept = (ev) => ev.deptname

export {
    getYear,
    getTerm,
    getCourse,
    getSection,
    getDept,
}