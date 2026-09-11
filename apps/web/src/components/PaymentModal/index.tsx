import React, { useState, useEffect, FormEvent } from "react";
import styles from "./index.module.css";
import { type Tariff } from "@buffvpn/shared";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: Tariff | null;
};

type PaymentStatus = "NEW" | "PROCESSING" | "PAID" | "EXPIRED" | "ERROR" | "REFUNDED";

export const PaymentModal: React.FC<Props> = ({ isOpen, onClose, selectedPlan }) => {
    const [step, setStep] = useState(1); // 1: Выбор и Email, 2: Ожидание оплаты, 3: Экран результата
    const [email, setEmail] = useState("");
    const [method, setMethod] = useState<"sbp" | "card">("sbp");
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState("");
    const [paymentUrl, setPaymentUrl] = useState("");

    // Данные результата
    const [finalStatus, setFinalStatus] = useState<PaymentStatus | "">("");
    const [subUrl, setSubUrl] = useState("");
    const [copied, setCopied] = useState(false);

    // Сброс стейта при открытии/закрытии
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setError("");
            setLoading(false);
            setCheckingStatus(false);
            setFinalStatus("");
            setSubUrl("");
            setCopied(false);
        }
    }, [isOpen, selectedPlan]);

    if (!isOpen || !selectedPlan) return null;

    // Шаг 1: Инициализация счета
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

    // Шаг 2: Единичная проверка статуса (без setInterval)
    const handleCheckPaymentStatus = async () => {
        if (!orderId) return;

        setCheckingStatus(true);
        setError("");

        try {
            const res = await fetch(`/api/payment/status/${orderId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Не удалось проверить статус");

            const currentStatus: PaymentStatus = data.status;
            setFinalStatus(currentStatus);

            if (currentStatus === "PAID") {
                if (data.subscriptionUrl) {
                    setSubUrl(data.subscriptionUrl);
                }
                setStep(3);
            } else if (currentStatus === "NEW" || currentStatus === "PROCESSING") {
                // Pending кейс: информируем пользователя
                setStep(3);
            } else {
                // ERROR | EXPIRED | REFUNDED
                setStep(3);
            }
        } catch (err: any) {
            setError(err.message || "Ошибка проверки платежа");
        } finally {
            setCheckingStatus(false);
        }
    };

    const copyToClipboard = () => {
        if (!subUrl) return;
        navigator.clipboard.writeText(subUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`card ${styles.paymentCard}`} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Закрыть">&times;</button>

                {/* STEP 1: Ввод данных */}
                {step === 1 && (
                    <div>
                        <div className={styles.header}>
                            <span className={styles.planBadge}>{selectedPlan.name}</span>
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
                                {loading ? "Формирование счета..." : `Оплатить ${selectedPlan.price} ₽`}
                            </button>
                        </form>
                    </div>
                )}

                {/* STEP 2: Ожидание оплаты и ручная кнопка проверки */}
                {step === 2 && (
                    <div className={styles.stepWaiting}>
                        <div className={styles.spinner}></div>
                        <h3>Оплата открыта в новом окне</h3>
                        <p className={styles.desc}>
                            Завершите перевод в платежном шлюзе банка, затем нажмите кнопку проверки ниже.
                        </p>

                        <div className={styles.waitActions}>
                            <button
                                onClick={handleCheckPaymentStatus}
                                className="btn btn-primary btn-block"
                                disabled={checkingStatus}
                            >
                                {checkingStatus ? "Проверка статуса..." : "Я оплатил — проверить статус"}
                            </button>

                            <a href={paymentUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-block">
                                Открыть страницу оплаты еще раз
                            </a>

                            {error && <div className="error-message" style={{ marginTop: 10 }}>{error}</div>}
                        </div>
                    </div>
                )}

                {/* STEP 3: Результат проверки */}
                {step === 3 && (
                    <div>
                        {/* КЕЙС 1: PAID (Успешно) */}
                        {finalStatus === "PAID" && (
                            <div className={styles.stepSuccess}>
                                <div className={styles.successIcon}>✓</div>
                                <h3>Оплата прошла успешно!</h3>
                                <p className={styles.desc}>
                                    Подписка на <strong>{selectedPlan.name}</strong> активирована. Мы отправили ключ и инструкцию на <strong>{email}</strong>.
                                </p>

                                {subUrl && (
                                    <div style={{ marginTop: 18, textAlign: "left" }}>
                                        <label className={styles.label}>Ваша ссылка подписки:</label>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <input type="text" readOnly value={subUrl} className="custom-input read-only" />
                                            <button onClick={copyToClipboard} className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
                                                {copied ? "Скопировано! ✓" : "Копировать"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button onClick={onClose} className="btn btn-primary btn-block" style={{ marginTop: 24 }}>
                                    Закрыть
                                </button>
                            </div>
                        )}

                        {/* КЕЙС 2: NEW / PROCESSING (В обработке / Pending) */}
                        {(finalStatus === "NEW" || finalStatus === "PROCESSING") && (
                            <div className={styles.stepSuccess}>
                                <div className={styles.pendingIcon}>⏳</div>
                                <h3>Платеж обрабатывается банком</h3>
                                <p className={styles.desc}>
                                    Банку требуется от 1 до 5 минут на подтверждение транзакции.
                                    Как только оплата поступит, подписка активируется автоматически, а ссылка доступа придет на почту <strong>{email}</strong>.
                                </p>
                                <div className={styles.scenarioAlert}>
                                    ✉️ Не переживайте: если деньги списались, доступ гарантированно поступит на вашу почту.
                                </div>
                                <button onClick={onClose} className="btn btn-secondary btn-block">
                                    Понятно, буду ждать письмо
                                </button>
                            </div>
                        )}

                        {/* КЕЙС 3: ERROR / EXPIRED / REFUNDED (Неуспех) */}
                        {(finalStatus === "ERROR" || finalStatus === "EXPIRED" || finalStatus === "REFUNDED") && (
                            <div className={styles.stepError}>
                                <div className={styles.errorIcon}>✕</div>
                                <h3>Оплата не прошла</h3>
                                <p className={styles.desc}>
                                    Платежный шлюз вернул статус: <strong>{finalStatus}</strong>. Деньги не были списаны или время действия счета истекло.
                                </p>
                                <div className={styles.errorAlert}>
                                    Попробуйте еще раз или выберите другой способ оплаты (например, СБП вместо карты).
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="btn btn-primary btn-block"
                                    style={{ marginTop: 18 }}
                                >
                                    Попробовать еще раз
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};