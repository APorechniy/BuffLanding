import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import logoImg from "../../assets/logo.png";

export default function Hero() {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsShrunk(true);
            const timer2 = setTimeout(() => {
                setIsVisible(true);
            }, 150);
            return () => clearTimeout(timer2);
        }, 1500);

        return () => clearTimeout(timer1);
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
            {/* Атмосферные свечения */}
            <div className={`${styles.bgGlow} ${styles.bgGlow1}`}></div>
            <div className={`${styles.bgGlow} ${styles.bgGlow2}`}></div>

            {/* Центральный выделенный логотип с анимацией перехода на фон */}
            <div
                className={`${styles.logoWrapper} ${isShrunk ? styles.logoWrapperShrunk : ""
                    }`}
            >
                <img
                    src={logoImg}
                    alt="Buff VPN Logo"
                    className={styles.logoImg}
                />
            </div>

            {/* Главный интерфейс */}
            <div
                className={`${styles.appLayout} ${isVisible ? styles.layoutVisible : ""
                    }`}
            >
                {/* Левая панель: Призыв к действию и переход на тарифы */}
                <main className={`${styles.panel} ${styles.panelLeft}`}>
                    <article className={`${styles.card} ${styles.cardCenter}`}>
                        <h1 className={styles.cardTitle}>Включи свободу</h1>
                        <p className={styles.cardSubtitle}>
                            Мгновенный обход любых блокировок на скорости до <strong>10 Гбит/с</strong>.
                            Нажми для выбора тарифа:
                        </p>

                        <div className={styles.actionWrapper}>
                            <button
                                type="button"
                                className={styles.btnPower}
                                onClick={handleScrollToPricing}
                                aria-label="Выбрать тариф VPN"
                            >
                                <span className={styles.btnText}>
                                    <svg
                                        className={styles.btnIcon}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2v10"></path>
                                        <path d="M18.4 6.6a9 9 0 1 1-12.8 0"></path>
                                    </svg>
                                    <span>ПОДКЛЮЧИТЬ</span>
                                </span>
                            </button>
                            <span className={styles.btnHint}>Без рекламы и ограничений</span>
                        </div>
                    </article>
                </main>

                {/* Правая панель: Обновленная инструкция */}
                <aside className={`${styles.panel} ${styles.panelRight}`}>
                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Подключение за 3 минуты</h2>

                        <ol className={styles.steps}>
                            <li className={styles.stepsItem}>
                                <span className={styles.stepsNum}>1</span>
                                <div className={styles.stepsContent}>
                                    <strong>Выберите тарифный план</strong>
                                    <p>
                                        От быстрого теста на 10 минут до выгодной подписки на 3 месяца.
                                    </p>
                                </div>
                            </li>

                            <li className={styles.stepsItem}>
                                <span className={styles.stepsNum}>2</span>
                                <div className={styles.stepsContent}>
                                    <strong>Укажите ваш Email</strong>
                                    <p>
                                        На него мгновенно придет ссылка с личным защищенным ключом доступа.
                                    </p>
                                </div>
                            </li>

                            <li className={`${styles.stepsItem} ${styles.stepsItemHighlight}`}>
                                <span className={styles.stepsNum}>3</span>
                                <div className={styles.stepsContent}>
                                    <strong>Оплатите и пользуйтесь</strong>
                                    <p>
                                        Удобная оплата через СБП или картами РФ. Импорт в приложение нажатием 1 кнопки!
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </section>
                </aside>

                {/* Нижний блок: Преимущества и FAQ */}
                <footer className={`${styles.panel} ${styles.panelFull}`}>
                    <div
                        className={styles.card}
                        style={{ height: "auto", justifyContent: "flex-start", gap: "16px" }}
                    >
                        <section>
                            <h2
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    marginBottom: "6px",
                                }}
                            >
                                Преимущества протокола VLESS-Reality
                            </h2>
                            <p
                                style={{
                                    fontSize: "0.84rem",
                                    color: "var(--text-muted)",
                                    lineHeight: 1.5,
                                }}
                            >
                                Buff VPN маскирует зашифрованный трафик под стандартный серфинг,
                                делая его абсолютно невидимым для провайдеров и блокировок ТСПУ.
                                Поддержка iOS, Android, Windows, macOS и роутеров.
                            </p>
                        </section>

                        <section>
                            <h2
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    color: "#fff",
                                    marginBottom: "6px",
                                }}
                            >
                                Часто задаваемые вопросы (FAQ)
                            </h2>

                            <details className={styles.detailsItem}>
                                <summary className={styles.summaryTitle}>
                                    Куда вставлять ключ после покупки?
                                </summary>
                                <p className={styles.detailsDesc}>
                                    В письме будет прямая кнопка автоимпорта. Приложение (Streisand,
                                    v2rayNG, Happ или Hiddify) откроется само и подключит профиль.
                                </p>
                            </details>

                            <details className={styles.detailsItem}>
                                <summary className={styles.summaryTitle}>
                                    Сколько устройств можно использовать?
                                </summary>
                                <p className={styles.detailsDesc}>
                                    В зависимости от тарифа — от 4 до 10 ваших гаджетов одновременно
                                    на одной подписке.
                                </p>
                            </details>
                        </section>
                    </div>
                </footer>
            </div>
        </section>
    );
}