import type { PlainObjectKey, PlainObject } from '@/constants/common';

const replaceObjectProperty = (object: PlainObject, sourceKey: PlainObjectKey, targetKey: PlainObjectKey) => {
  if (object[sourceKey]) {
    object[targetKey] = object[sourceKey];
    delete object[sourceKey];
    return true;
  }
  else return false;
};

const ObjectManager = {
  replaceObjectProperty,
};

export default ObjectManager;
