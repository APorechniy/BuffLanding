import { useState, useEffect } from "react";
import { data } from "../../content/data";

import styles from './index.module.css'

type Props = {
    onOpenTrial: () => void
}

export const Header: React.FC<Props> = ({ onOpenTrial }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);
    // Плавный переход к тарифам
    const handleScrollToPricing = () => {
        const pricingElem = document.getElementById("pricing");
        if (pricingElem) {
            pricingElem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={`${styles.header} ${isVisible ? styles.layoutVisible : styles.layoutInvisible}`}>
            <div className={`${styles.container} ${styles.headerInner}`}>
                <a href="#" className={styles.logoWrapper}>
                    <span className={styles.logoText}>{data.brand.name}</span>
                </a>
                <nav className={styles.nav}>
                    {data.header.nav.map((item, idx) => (
                        <a key={idx} href={item.href}>{item.label}</a>
                    ))}
                </nav>
                <button onClick={handleScrollToPricing} className="btn btn-primary">
                    {data.header.cta}
                </button>
            </div>
        </header>
    );
}