//this function takes any value that can be converted in a date, so time in ms or date string
function transformDate(dateConstructor){
    let date = new Date(dateConstructor)
    return (date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear())
}

function transformTime(dateConstructor){
    let date = new Date(dateConstructor)
    return (
        pad(date.getUTCHours()) + ':' +
        pad(date.getUTCMinutes()) + ':' +
        pad(date.getUTCSeconds()))
}

function pad(digit){
    digit = digit+'';
    if (digit.length === 1) {
        return '0' + digit;
    }
    return digit;
}

export {
    transformDate,
    transformTime
}
