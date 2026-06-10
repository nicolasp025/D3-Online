import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollRestorer = () => {
    const location = useLocation();

    useEffect(() => {
        const saved = sessionStorage.getItem(`scroll-${location.pathname}`);
        window.scrollTo(0, saved ? Number(saved) : 0);

        return () => {
            sessionStorage.setItem(
                `scroll-${location.pathname}`,
                String(window.scrollY),
            );
        };
    }, [location.pathname]);

    return null;
};

export default ScrollRestorer;
