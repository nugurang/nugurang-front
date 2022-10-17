// https://gist.github.com/blacksmoke26/af6c1b4c13cc99740285ab198d37fda4

import { useCallback, useEffect, useState } from 'react';
import localForage from 'localforage';

type UseLocalForageProps = { initialValue?: any; overrideValue?: boolean };
type UseLocalForageMethods = [any, (value: any) => void, () => void];

/**
 * React custom hook to save/restore using localforage library
 * @example
 * ```js
 * function App() {
 *  const [value, updateValue, removeValue] = useLocalForage('key', {});
 * }
 * ```
 */
export default function useLocalForage(
  key: string,
  props: UseLocalForageProps = { overrideValue: false },
): UseLocalForageMethods {
  const [value, setValue] = useState(null);

  const getItem = useCallback(async () => {
    const item = await localForage.getItem(key);
    return item;
  }, [key]);

  const updateValue = useCallback(
    async (value: any) => {
      await localForage.setItem(key, value);
      setValue(() => value);
    },
    [key],
  );

  const removeValue = useCallback(async () => {
    await localForage.setItem(key, null);
    setValue(() => null);
  }, [key]);

  const initializeItemFromStorage = useCallback(async () => {
    const value = await getItem();
    if (props.overrideValue) {
      const initialValue = props.initialValue;
      await localForage.setItem(key, initialValue);
      setValue(() => initialValue);
    } else {
      const initialValue = value !== undefined ? value : props.initialValue;
      await localForage.setItem(key, initialValue);
      setValue(() => initialValue);
    }
  }, [key]);

  useEffect(() => {
    initializeItemFromStorage();
  }, []);

  return [value, updateValue, removeValue];
}
