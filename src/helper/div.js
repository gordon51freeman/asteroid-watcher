//this function takes any value that can be converted in a date, so time in ms or date string
function transformDate(dateConstructor){
    let date = new Date(dateConstructor)
    return (date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear())
}

function transformTime(dateConstructor){
    let date = new Date(dateConstructor)
    return (
        pad(date.getUTCHours()) + ':' +
        pad(date.getUTCMinutes()))
}

function getDateForAPIRequest(){
    let date = new Date();
    let month = date.getMonth() + 1;
    if(month > 12){
        month = 1;
    }
    return(
        date.getFullYear() + '-' +
        pad(month) + '-' +
        pad(date.getDate())
    )
}

function pad(digit){
    digit = digit+'';
    if (digit.length === 1) {
        return '0' + digit;
    }
    return digit;
}
//i nicked this function from stackoverflow
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export {
    pad,
    transformDate,
    transformTime,
    getDateForAPIRequest,
    numberWithCommas
}
