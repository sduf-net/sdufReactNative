export const isEmpty = (obj) => {
  if (obj instanceof Object) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  }
  if (typeof obj === 'string' && obj.length > 0) {
    return false;
  }
  if (typeof obj === 'number' && obj.toString().length > 0) {
    return false;
  }
  return true;
};
