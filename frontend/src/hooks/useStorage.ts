import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, SetValue<T>, () => void] {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage,
): [T, SetValue<T>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
}
