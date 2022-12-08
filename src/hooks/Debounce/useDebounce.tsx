import React, {useState, useEffect} from 'react';


const useDebounce = (value:any, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect (() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}

export default useDebounce