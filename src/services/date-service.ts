const convertDateToString = (date?: string) => {
    let d     = date ? new Date(date) : new Date()
    let month = '' + (d.getMonth() + 1),
        day   = '' + d.getDate(),
        year  = d.getFullYear()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [ year, month, day ].join('-')
}

const convertStringToDate = (date?: string) => {
    let d = date ? new Date(date) : new Date()
    return d.toISOString()
}

export {
    convertDateToString,
    convertStringToDate,
}