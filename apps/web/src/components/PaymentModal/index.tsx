import React, { useState, useEffect, FormEvent } from "react";
import styles from "./index.module.css";
import { type Tariff } from "@buffvpn/shared";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    selectedPlan: Tariff | null,
}

export const PaymentModal: React.FC<Props> = ({ isOpen, onClose, selectedPlan }) => {
    const [step, setStep] = useState(1); // 1: Выбор и Email, 2: Ожидание оплаты, 3: Успешно
    const [email, setEmail] = useState("");
    const [method, setMethod] = useState("sbp"); // 'sbp' | 'card' | 'crypto'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");

    // Сброс стейта при закрытии/открытии
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setError("");
            setLoading(false);
        }
    }, [isOpen, selectedPlan]);

    // Polling статуса оплаты на шаге 2
    useEffect(() => {
        if (step !== 2 || !orderId) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/payment/status/${orderId}`);
                const data = await res.json();
                if (data.status === "completed") {
                    setStep(3);
                    clearInterval(interval);
                }
            } catch (e) {
                // тихий отлов сетевых сбоев поллинга
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [step, orderId]);

    if (!isOpen || !selectedPlan) return null;

    const handleStartPayment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/payment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret":
                        "pcthbmF77fE0tlDIsrSBF9eIznJ0SgPDDqzfHO8Unsu5BKtJc7Ganbrp59x5me9D",
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    tariffId: selectedPlan.id,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Ошибка инициализации счета");

            setOrderId(data.orderId);
            setPaymentUrl(data.paymentUrl);
            setStep(2);

            window.open(data.paymentUrl, "_blank");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`card ${styles.paymentCard}`} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                {/* STEP 1: Ввод данных */}
                {step === 1 && (
                    <div>
                        <div className={styles.header}>
                            <span className={styles.planBadge}>{selectedPlan?.name}</span>
                            <h3 className={styles.title}>Оформление подписки</h3>
                            <p className={styles.desc}>Ключ будет активирован и выслан на вашу почту</p>
                        </div>

                        <div className={styles.summaryBox}>
                            <span>Тариф: <b>{selectedPlan.name}</b></span>
                            <span className={styles.summaryPrice}>{selectedPlan.price} ₽</span>
                        </div>

                        <form onSubmit={handleStartPayment}>
                            <div className="input-group" style={{ marginBottom: 20 }}>
                                <label className={styles.label}>Email для получения ключа</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="custom-input"
                                />
                            </div>

                            <label className={styles.label}>Способ оплаты</label>
                            <div className={styles.methodsGrid}>
                                <div
                                    className={`${styles.methodItem} ${method === "sbp" ? styles.activeMethod : ""}`}
                                    onClick={() => setMethod("sbp")}
                                >
                                    <span className={styles.methodIcon}>⚡</span>
                                    <div>
                                        <div className={styles.methodTitle}>СБП QR</div>
                                        <div className={styles.methodSub}>Без комиссии</div>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.methodItem} ${method === "card" ? styles.activeMethod : ""}`}
                                    onClick={() => setMethod("card")}
                                >
                                    <span className={styles.methodIcon}>💳</span>
                                    <div>
                                        <div className={styles.methodTitle}>Карты РФ / МИР</div>
                                        <div className={styles.methodSub}>Любые банки</div>
                                    </div>
                                </div>
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading ? "Формирование счета..." : `Оплатить`}
                            </button>
                        </form>
                    </div>
                )}

                {/* STEP 2: Ожидание подтверждения */}
                {step === 2 && (
                    <div className={styles.stepWaiting}>
                        <div className={styles.spinner}></div>
                        <h3>Ожидание подтверждения оплаты...</h3>
                        <p className={styles.desc}>
                            Страница оплаты открылась в новом окне. Завершите перевод в приложении банка.
                        </p>

                        <div className={styles.waitActions}>
                            <a href={paymentUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-block">
                                Открыть шлюз заново
                            </a>
                            <span className={styles.hintText}>
                                После оплаты окно обновится автоматически
                            </span>
                        </div>
                    </div>
                )}

                {/* STEP 3: Готово */}
                {step === 3 && (
                    <div className={styles.stepSuccess}>
                        <div className={styles.successIcon}>✓</div>
                        <h3>Оплата прошла успешно!</h3>
                        <p className={styles.desc}>
                            Подписка на <strong>{selectedPlan.name}</strong> активирована. Мы отправили ключ и инструкцию на <strong>{email}</strong>.
                        </p>
                        <button onClick={onClose} className="btn btn-primary btn-block">
                            Закрыть
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}