import {getDateForAPIRequest} from "./div";

const DATA_KEY = 'COMP'

function saveDataLS(data){
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
function getDataLS(){
    return JSON.parse(localStorage.getItem(DATA_KEY));
}

function storageEmpty(){
    if (localStorage.getItem(DATA_KEY) == null || localStorage.getItem(DATA_KEY) === undefined){
        return true
    }else{
        return false
    }
}

function isDataOld(){
    let data = getDataLS()
    let days = []
    let ret_val = true;
    for(let day in data){
        days.push(day);
    }
    days.sort()
    if(days[0] === getDateForAPIRequest()){
        ret_val = false;
    }
    return ret_val;
}

export {
    saveDataLS,
    getDataLS,
    storageEmpty,
    isDataOld
}
