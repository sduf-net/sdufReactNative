import React, { useState, useEffect } from 'react';

export default function useDebounced(callback, delay) {
    const [debouncedValue, setDebouncedValue] = useState(callback);

    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(callback) }, delay);

        return () => { clearTimeout(handler) };
    }, [callback, delay]);

    return debouncedValue;
}