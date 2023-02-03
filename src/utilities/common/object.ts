import type { PlainObjectKey, PlainObject } from '@/constants/common';

const isValidJsonString = (source: string) => {
  try {
    const json = JSON.parse(source);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

const replaceObjectProperty = (object: PlainObject, sourceKey: PlainObjectKey, targetKey: PlainObjectKey) => {
  if (object[sourceKey]) {
    object[targetKey] = object[sourceKey];
    delete object[sourceKey];
    return true;
  }
  return false;
};

const ObjectManager = {
  isValidJsonString,
  replaceObjectProperty,
};

export default ObjectManager;
