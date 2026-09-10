import React from 'react';
import { TARIFFS, type Tariff } from '@buffvpn/shared';
import styles from './index.module.css';

type Props = {
    onSelectTariff: (tariff: Tariff) => void
}

export const Pricing: React.FC<Props> = ({ onSelectTariff }) => {
    const plans = Object.values(TARIFFS);

    return (
        <section id="pricing" className={styles.pricingSection}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Тарифные планы</h2>
                    <p className={styles.subtitle}>
                        Честный доступ без ограничений скорости. Выберите подходящий период:
                    </p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan) => {
                        const isFeatured = Boolean(plan.featured);

                        return (
                            <div
                                key={plan.id}
                                className={`${styles.card} ${isFeatured ? styles.featured : ''}`}
                            >
                                {plan.badge && (
                                    <div className={styles.badge}>{plan.badge}</div>
                                )}

                                <div className={styles.icon}>{plan.icon}</div>
                                <h3 className={styles.planName}>{plan.name}</h3>

                                <div className={styles.cost}>{plan.price} ₽</div>
                                <div className={styles.period}>
                                    {plan.days > 0 ? `на ${plan.days} дней` : `на ${plan.minutes} минут`}
                                </div>

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
                                        <span>Скорость: до 10 Гбит/с</span>
                                    </li>
                                </ul>

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