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
    async (newValue: any) => {
      await localForage.setItem(key, newValue);
      setValue(() => newValue);
    },
    [key],
  );

  const removeValue = useCallback(async () => {
    await localForage.setItem(key, null);
    setValue(() => null);
  }, [key]);

  const initializeItemFromStorage = useCallback(async () => {
    const newValue = await getItem();
    if (props.overrideValue) {
      const { initialValue } = props;
      await localForage.setItem(key, initialValue);
      setValue(() => initialValue);
    } else {
      const initialValue =
        newValue !== undefined ? newValue : props.initialValue;
      await localForage.setItem(key, initialValue);
      setValue(() => initialValue);
    }
  }, [getItem, key, props]);

  useEffect(() => {
    initializeItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, updateValue, removeValue];
}
