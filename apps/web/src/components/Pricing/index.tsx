import { TARIFFS, type Tariff } from "@buffvpn/shared";
import styles from "./index.module.css";

interface PricingProps {
    onSelectTariff: (plan: Tariff) => void;
    onOpenTrial: () => void;
}

export const Pricing = ({ onSelectTariff, onOpenTrial }: PricingProps) => {
    // Верхний ряд: Бесплатный триал и легкий тариф (13 руб)
    const trialPlan = TARIFFS["trial"];
    const quickPlan = TARIFFS["1"];

    // Нижний ряд: 1 месяц, 2 месяца, 3 месяца
    const regularPlans = [TARIFFS["30"], TARIFFS["60"], TARIFFS["90"]].filter(Boolean);

    // Рендер фичей списка
    const renderFeatures = (plan: Tariff) => (
        <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
                <span className={styles.checkMark}>✔</span>
                <span>Трафик: {plan.total_gb} ГБ</span>
            </li>
            <li className={styles.featureItem}>
                <span className={styles.checkMark}>✔</span>
                <span>Устройств: до {plan.devices} шт.</span>
            </li>
            <li className={styles.featureItem}>
                <span className={styles.checkMark}>✔</span>
                <span>Протокол: VLESS Reality</span>
            </li>
            <li className={styles.featureItem}>
                <span className={styles.checkMark}>✔</span>
                <span>Канал: до 10 Гбит/с</span>
            </li>
        </ul>
    );

    return (
        <section id="pricing" className={styles.pricingSection}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Тарифные планы</h2>
                    <p className={styles.subtitle}>
                        Попробуйте бесплатно или выберите оптимальный период для работы и развлечений:
                    </p>
                </div>

                {/* ================= ВЕРХНИЙ РЯД: 2 КАРТОЧКИ БЫСТРОГО СТАРТА ================= */}
                <div className={styles.topRow}>
                    {/* 1. БЕЛЫЙ LIQUID GLASS: БЕСПЛАТНЫЙ ТРИАЛ */}
                    {trialPlan && (
                        <div className={`${styles.card} ${styles.trialGlass}`}>
                            {trialPlan.badge && (
                                <div className={`${styles.badge} ${styles.badgeWhite}`}>
                                    {trialPlan.badge}
                                </div>
                            )}
                            <div className={styles.icon}>{trialPlan.icon}</div>
                            <h3 className={styles.planName}>{trialPlan.name}</h3>

                            <div className={styles.cost}>0 ₽</div>
                            <div className={styles.period}>на 24 часа без привязки карт</div>

                            {renderFeatures(trialPlan)}

                            <button
                                type="button"
                                onClick={onOpenTrial}
                                className={`${styles.btnBuy} ${styles.btnWhite}`}
                            >
                                Попробовать бесплатно
                            </button>
                        </div>
                    )}

                    {/* 2. ИЗУМРУДНЫЙ LIQUID GLASS: ЛЕГКИЙ ТЕСТ (13 РУБЛЕЙ) */}
                    {quickPlan && (
                        <div className={`${styles.card} ${styles.emeraldGlass}`}>
                            {quickPlan.badge && (
                                <div className={`${styles.badge} ${styles.badgeEmerald}`}>
                                    {quickPlan.badge}
                                </div>
                            )}
                            <div className={styles.icon}>{quickPlan.icon}</div>
                            <h3 className={styles.planName}>{quickPlan.name}</h3>

                            <div className={styles.cost}>{quickPlan.price} ₽</div>
                            <div className={styles.period}>на {quickPlan.minutes} минут теста</div>

                            {renderFeatures(quickPlan)}

                            <button
                                type="button"
                                onClick={() => onSelectTariff(quickPlan)}
                                className={`${styles.btnBuy} ${styles.btnEmerald}`}
                            >
                                Купить за {quickPlan.price} ₽
                            </button>
                        </div>
                    )}
                </div>

                {/* ================= НИЖНИЙ РЯД: 3 РЕГУЛЯРНЫХ ТАРИФА ================= */}
                <div className={styles.bottomRow}>
                    {regularPlans.map((plan) => {
                        const isFeatured = Boolean(plan.featured);

                        return (
                            <div
                                key={plan.id}
                                className={`${styles.card} ${isFeatured ? styles.featured : ""}`}
                            >
                                {plan.badge && (
                                    <div className={styles.badge}>{plan.badge}</div>
                                )}
                                <div className={styles.icon}>{plan.icon}</div>
                                <h3 className={styles.planName}>{plan.name}</h3>

                                <div className={styles.cost}>{plan.price} ₽</div>
                                <div className={styles.period}>на {plan.days} дней свободы</div>

                                {renderFeatures(plan)}

                                <button
                                    type="button"
                                    onClick={() => onSelectTariff(plan)}
                                    className={`${styles.btnBuy} ${isFeatured ? styles.btnPrimary : styles.btnSecondary
                                        }`}
                                >
                                    Купить
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}