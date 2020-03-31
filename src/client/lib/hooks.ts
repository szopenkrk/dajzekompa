import { useState, useEffect } from 'react';

function getWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

export function useWindowSize () {
    const [ width, setWidth ] = useState(getWidth());
    const [ height, setHeight ] = useState(getHeight());

    useEffect(() => {
        let tid = null;

        const listener = () => {
            clearTimeout(tid);
            tid = setTimeout(() => {
                setWidth(getWidth());
                setHeight(getHeight());
            }, 150);
        };

        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    return { width, height };
}
