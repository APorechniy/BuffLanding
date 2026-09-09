import React, { type FormEvent, useState } from "react";
import { data } from "../content/data";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

type Platform = "ios" | "android" | "windows" | "mac"

const tabs: Array<Platform> = ["ios", "android", "windows", "mac"]

const TrialModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [subUrl, setSubUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("ios");

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
            if (!res.ok) throw new Error(resData.error || "Не удалось активировать доступ");

            setSubUrl(resData.subscriptionUrl);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(subUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="card modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Закрыть">&times;</button>

                <h3 className="modal-title">Бесплатный тест на 1 день</h3>
                <p className="modal-subtitle">
                    Укажите ваш Email — мы мгновенно сгенерируем ключ и отправим копию письма со ссылкой.
                </p>

                {!subUrl ? (
                    <form onSubmit={handleGetTrial} className="trial-form">
                        <div className="input-group">
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="custom-input"
                            />
                            <span className="input-hint">
                                Никакого спама. Только ключ доступа и инструкция.
                            </span>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? "Отправка доступа..." : "Получить на 1 день"}
                        </button>
                    </form>
                ) : (
                    <div className="result-container">
                        <div className="success-banner">
                            ✉️ Ссылка также отправлена на <b>{email}</b>
                        </div>

                        <label className="result-label">Ваша ссылка подписки:</label>
                        <div className="sub-box">
                            <input type="text" readOnly value={subUrl} className="custom-input read-only" />
                            <button onClick={copyToClipboard} className="btn btn-primary copy-btn">
                                {copied ? "Скопировано! ✓" : "Копировать"}
                            </button>
                        </div>

                        <div className="os-tabs">
                            {["ios", "android", "windows", "mac"].map((os) => (
                                <button
                                    key={os}
                                    className={`tab-btn ${activeTab === os ? "active" : ""}`}
                                    onClick={() => setActiveTab(os)}
                                >
                                    {os.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrialModal