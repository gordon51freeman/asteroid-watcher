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

export {
    saveDataLS,
    getDataLS,
    storageEmpty,
}
