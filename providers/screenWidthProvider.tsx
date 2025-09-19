import React, { createContext, useCallback, useEffect, useRef, useState } from "react";

type ScreenContextType = number | undefined;

export const ScreenWidthContext = createContext<ScreenContextType>(undefined);

export default function ScreenWidthProvider({ children }: { children: React.ReactNode }) {
    const [width, setWidth] = useState<ScreenContextType>(undefined);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleResize = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 100);
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleResize]);

    return <ScreenWidthContext.Provider value={width}>{children}</ScreenWidthContext.Provider>;
}
