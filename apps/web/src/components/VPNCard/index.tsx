import React, { useState } from 'react';
import styles from './index.module.css';

export const VpnCard = () => {
    const [isConnected, setIsConnected] = useState(false);

    const toggleConnection = () => {
        setIsConnected((prev) => !prev);
    };

    return (
        <div className={`${styles.cardContainer} ${isConnected ? styles.connected : styles.disconnected}`}>

            {/* Хедер карточки */}
            <div className={styles.header}>
                <div className={styles.logoBadge}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>BUFF VPN</span>
                </div>
                <button className={styles.iconButton} aria-label="Settings">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>
            </div>

            {/* Статус */}
            <div className={styles.statusWrapper}>
                <div className={styles.statusTitle}>
                    {isConnected ? 'Подключено' : 'Отключено'}
                </div>
                <div className={styles.statusIp}>
                    {isConnected ? '185.220.101.5' : 'Ваш IP не защищен'}
                </div>
            </div>

            {/* Кнопка действия */}
            <div className={styles.powerButtonOuter}>
                <div className={styles.pulseRing}></div>
                <button
                    className={styles.powerBtn}
                    onClick={toggleConnection}
                    aria-label={isConnected ? "Disconnect" : "Connect"}
                >
                    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                </button>
            </div>

            {/* Выбор сервера / локация */}
            <div className={styles.locationSelector}>
                <div className={styles.locationInfo}>
                    <span className={styles.flag} role="img" aria-label="Netherlands">🇳🇱</span>
                    <div>
                        <div className={styles.country}>Нидерланды</div>
                        <div className={styles.city}>Амстердам #4</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={styles.pingBadge}>
                        <span className={styles.pingDot}></span>
                        <span>24 ms</span>
                    </div>
                    <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>

        </div>
    );
};