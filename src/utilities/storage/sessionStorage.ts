const getItem = (key: string) => sessionStorage.getItem(key);
const setItem = (key: string, value: string) => sessionStorage.setItem(key, value);
const deleteItem = (key: string) => sessionStorage.removeItem(key);
const clearItems = () => sessionStorage.clear();

const SessionStorageManager = {
  get: getItem,
  set: setItem,
  delete: deleteItem,
  clear: clearItems,
};

export default SessionStorageManager;
