const setItem = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
}

const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const removeItem = (key) => {
    localStorage.removeItem(key);
}

export { setItem, getItem, removeItem };
