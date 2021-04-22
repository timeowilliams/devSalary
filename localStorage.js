const ls = (localStorage) => {
    let storage = localStorage;
    let isAvailable = false;
    let storageChecked = false;
  
    const checkForLS = () => {
      if (!storageChecked) {
        if (!storage) {
          isAvailable = false;
        }
        try {
          set('test', 'test');
          remove('test');
          isAvailable = true;
        } catch (e) {
          isAvailable = false;
        }
        storageChecked = true;
        return isAvailable;
      }
      return isAvailable;
    };
  
    const set = (key, value) => {
      if (checkForLS) {
        storage.setItem(key, JSON.stringify(value));
      }
    };
  
    const get = (key) => {
      if (checkForLS) {
        return JSON.parse(storage.getItem(key));
      }
    };
  
    const remove = (key) => {
      if (checkForLS) {
        storage.removeItem(key);
      }
    };
  
    const showAllKeys = () => ({
      storage,
      isAvailable,
      storageChecked,
    });
  
    return {
      set,
      get,
      remove,
      showAllKeys,
    };
  };
  
  export default ls;
  