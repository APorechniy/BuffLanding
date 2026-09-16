import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { VpnCard } from "../VPNCard";
import { BackgroundLogo } from "../BackgroundLogo";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer2: any;
        const timer1 = setTimeout(() => {
            timer2 = setTimeout(() => {
                setIsVisible(true);
            }, 150);
        }, 1500);

        // Корректная очистка обоих таймеров
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
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
        <section className={styles.heroWrapper}>
            <BackgroundLogo />

            {/* Главный интерфейс */}
            <div
                className={`${styles.appLayout} ${isVisible ? styles.layoutVisible : styles.layoutInvisible
                    }`}
            >
                <div className={styles.mainContent}>
                    <div className={styles.leftBlock}>
                        <h1 className={styles.title}>
                            <span className={styles.gradientText}>Buff</span> - быстрый Proxy для всех ваших устройств
                        </h1>

                        <p className={styles.subtitle}>
                            Стабильное подключение, трафик от 1 ТБ в месяц и серверы в 30+ странах. Один ключ работает одновременно на телефоне, компьютере, планшете и телевизоре
                        </p>

                        <div className={styles.buttonRow}>
                            <a className={styles.buttonMain} onClick={handleScrollToPricing}>
                                Подключить за 250 рублей в месяц
                            </a>

                            <div className={styles.buttonHint}>
                                <p className={styles.hintTitle}>Доступ сразу после оплаты</p>
                                <p className={styles.hintSubtitle}>Без скрытых ограничений</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightBlock}>
                        <VpnCard />
                    </div>
                </div>
            </div>
        </section>
    );
}