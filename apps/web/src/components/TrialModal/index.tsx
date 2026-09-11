import React, { type FormEvent, useState } from "react";
import { data } from "../../content/data";
import styles from "./index.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSelectTariff?: () => void;
};

type Platform = "ios" | "android" | "windows" | "mac";
const tabs: Array<Platform> = ["ios", "android", "windows", "mac"];

type TrialState =
    | { type: "INITIAL" }
    | { type: "NEW_TRIAL"; subUrl: string }
    | { type: "ACTIVE_SUBSCRIPTION"; message: string }
    | { type: "TRIAL_EXPIRED"; message: string };

const TrialModal: React.FC<Props> = ({ isOpen, onClose, onSelectTariff }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<Platform>("ios");
    const [copied, setCopied] = useState(false);
    const [trialState, setTrialState] = useState<TrialState>({ type: "INITIAL" });

    if (!isOpen) return null;

    const handleGetTrial = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/trial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret":
                        "pcthbmF77fE0tlDIsrSBF9eIznJ0SgPDDqzfHO8Unsu5BKtJc7Ganbrp59x5me9D",
                },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });

            const resData = await res.json();

            if (res.ok && resData.status === "NEW_TRIAL") {
                setTrialState({ type: "NEW_TRIAL", subUrl: resData.subscriptionUrl });
                return;
            }

            if (resData.status === "ACTIVE_SUBSCRIPTION") {
                setTrialState({ type: "ACTIVE_SUBSCRIPTION", message: resData.error });
                return;
            }

            if (resData.status === "TRIAL_EXPIRED") {
                setTrialState({ type: "TRIAL_EXPIRED", message: resData.error });
                return;
            }

            throw new Error(resData.error || "Не удалось получить доступ");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGoToPricing = () => {
        onClose();
        if (onSelectTariff) {
            onSelectTariff();
        } else {
            const elem = document.getElementById("pricing");
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>

                {/* 1. Исходная форма ввода */}
                {trialState.type === "INITIAL" && (
                    <>
                        <h3 className={styles.modalTitle}>Бесплатный тест на 1 день</h3>
                        <p className={styles.modalSubtitle}>
                            Укажите ваш Email — мы сгенерируем ключ и отправим копию ссылки в письме.
                        </p>

                        <form onSubmit={handleGetTrial} className={styles.trialForm}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className={styles.customInput}
                                />
                                <span className={styles.inputHint}>
                                    Никакого спама. Только ссылка на подписку и инструкция.
                                </span>
                            </div>

                            {error && <div className={styles.errorMessage}>{error}</div>}

                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.btnBlock}`}
                                disabled={loading}
                            >
                                {loading ? "Проверка статуса..." : "Получить на 1 день"}
                            </button>
                        </form>
                    </>
                )}

                {/* 2. Новый пользователь -> Успех */}
                {trialState.type === "NEW_TRIAL" && (
                    <div className={styles.resultContainer}>
                        <div className={styles.successBanner}>
                            ✉️ Ссылка также отправлена на <b>{email}</b>
                        </div>

                        <label className={styles.resultLabel}>Ваша ссылка подписки:</label>
                        <div className={styles.subBox}>
                            <input
                                type="text"
                                readOnly
                                value={trialState.subUrl}
                                className={`${styles.customInput} ${styles.readOnly}`}
                            />
                            <button
                                onClick={() => copyToClipboard(trialState.subUrl)}
                                className={`btn btn-primary ${styles.copyBtn}`}
                            >
                                {copied ? "Скопировано! ✓" : "Копировать"}
                            </button>
                        </div>

                        <div className={styles.osTabs}>
                            {tabs.map((os) => (
                                <button
                                    key={os}
                                    className={`${styles.tabBtn} ${activeTab === os ? styles.tabBtnActive : ""}`}
                                    onClick={() => setActiveTab(os)}
                                >
                                    {os.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <div className={styles.tabInstruction}>
                            <p><strong>Приложение:</strong> {data.osGuides[activeTab].appName}</p>
                            <p>{data.osGuides[activeTab].step}</p>
                        </div>
                    </div>
                )}

                {/* 3. Подписка активна */}
                {trialState.type === "ACTIVE_SUBSCRIPTION" && (
                    <div className={styles.infoScenarioBox}>
                        <div className={styles.infoIcon}>⚡</div>
                        <h3 className={styles.modalTitle}>Подписка уже активна!</h3>
                        <p className={styles.scenarioDesc}>
                            Для адреса <b>{email}</b> уже действует оплаченный или пробный доступ.
                        </p>
                        <div className={`${styles.scenarioAlert} ${styles.alertActive}`}>
                            📩 Действующая ссылка подключения находится в вашем почтовом ящике.
                            Проверьте письмо от Buff VPN (включая папку «Спам»).
                        </div>
                        <button onClick={onClose} className={`btn btn-secondary ${styles.btnBlock}`}>
                            Понятно, проверю почту
                        </button>
                    </div>
                )}

                {/* 4. Триал исчерпан */}
                {trialState.type === "TRIAL_EXPIRED" && (
                    <div className={styles.infoScenarioBox}>
                        <div className={`${styles.infoIcon} ${styles.iconExpired}`}>⌛</div>
                        <h3 className={styles.modalTitle}>Пробный период завершен</h3>
                        <p className={styles.scenarioDesc}>
                            Вы уже использовали бесплатный тестовый доступ для <b>{email}</b>.
                        </p>
                        <div className={`${styles.scenarioAlert} ${styles.alertExpired}`}>
                            🚀 Чтобы продолжить пользоваться интернетом на скорости до 10 Гбит/с, выберите тарифный план.
                        </div>
                        <button onClick={handleGoToPricing} className={`btn btn-primary ${styles.btnBlock}`}>
                            Выбрать тариф (от 13 ₽)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrialModal;