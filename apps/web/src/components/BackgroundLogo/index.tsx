import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

import logoImg from "../../assets/logo.png";

export const BackgroundLogo = () => {
    const [mounted, setMounted] = useState(false);
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let timer2: ReturnType<typeof setTimeout>;

        const timer1 = setTimeout(() => {
            setIsShrunk(true);

            timer2 = setTimeout(() => {
            }, 150);
        }, 1500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (!mounted) return null;

    const wrapperClass = [
        styles.logoWrapper,
        isShrunk ? styles.logoWrapperShrunk : "",
    ]
        .filter(Boolean)
        .join(" ");

    return createPortal(
        <div className={wrapperClass} aria-hidden="true">
            <img
                src={logoImg}
                alt="Buff VPN Logo"
                className={styles.logoImg}
            />
        </div>,
        document.body
    );
};