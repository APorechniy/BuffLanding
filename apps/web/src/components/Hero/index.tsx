import React, { useEffect, useRef } from "react";
import { data } from "../../content/data";
import styles from "./index.module.css";

type Props = {
    onOpenTrial: () => void
}

const Hero: React.FC<Props> = ({ onOpenTrial }) => {
    const { hero } = data;

    // Рефы для элементов анимации (прямой доступ к DOM без re-renders)
    const ring1Ref = useRef<HTMLDivElement>(null);
    const ring2Ref = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animId: number;
        let startTime = performance.now();

        // 60-120 FPS цикл анимации на чистом JS
        const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000; // секунды

            // 1. Анимация зеленой точки статуса (синусоида ~2 секунды на цикл)
            if (dotRef.current) {
                const dotSine = (Math.sin(elapsed * 3.14) + 1) / 2; // 0..1
                dotRef.current.style.opacity = (0.4 + dotSine * 0.6).toFixed(3);
                dotRef.current.style.transform = `scale(${(0.85 + dotSine * 0.15).toFixed(3)})`;
            }

            // 2. Первое кольцо (цикл 2.6 сек)
            if (ring1Ref.current) {
                const progress1 = (elapsed % 2.6) / 2.6; // 0..1
                const scale1 = 0.85 + progress1 * 0.55;
                const opacity1 = (1 - progress1) * 0.5;
                ring1Ref.current.style.transform = `scale(${scale1.toFixed(3)})`;
                ring1Ref.current.style.opacity = opacity1.toFixed(3);
            }

            // 3. Второе кольцо со сдвигом фазы (на 1.3 секунды)
            if (ring2Ref.current) {
                const progress2 = ((elapsed + 1.3) % 2.6) / 2.6; // 0..1
                const scale2 = 0.85 + progress2 * 0.55;
                const opacity2 = (1 - progress2) * 0.5;
                ring2Ref.current.style.transform = `scale(${scale2.toFixed(3)})`;
                ring2Ref.current.style.opacity = opacity2.toFixed(3);
            }

            animId = requestAnimationFrame(animate);
        };

        animId = requestAnimationFrame(animate);

        // Очистка при размонтировании: цикл не висит в памяти
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.heroGlow}></div>

            <div className={`container ${styles.heroContainer}`}>
                {/* Компактный статус-бейдж */}
                <div className={styles.statusBadge}>
                    <span ref={dotRef} className={styles.pulseDot}></span>
                    <span>Сеть готова • 10 Gbps VLESS-Reality</span>
                </div>

                {/* Главная кнопка подключения */}
                <div className={styles.buttonStage}>
                    <div ref={ring1Ref} className={styles.pulseRing}></div>
                    <div ref={ring2Ref} className={styles.pulseRing}></div>

                    <button
                        type="button"
                        className={styles.connectBtn}
                        onClick={onOpenTrial}
                        aria-label="Подключить VPN"
                    >
                        <div className={styles.powerIcon}>
                            <svg
                                viewBox="0 0 24 24"
                                width="64"
                                height="64"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <span className={styles.btnLabel}>ПОДКЛЮЧИТЬ</span>
                    </button>
                </div>

                {/* Акцентный интерактивный блок «1 день бесплатно» */}
                <button
                    type="button"
                    className={styles.trialPill}
                    aria-label="Активировать 1 день бесплатно"
                >
                    <span className={styles.trialIcon}>⚡</span>
                    <span className={styles.trialText}>1 день бесплатно</span>
                </button>

                {/* Лаконичные метрики в виде одной полоски */}
                <div className={styles.quickStats}>
                    <span className={styles.statPoint}><b>99.98%</b> Uptime</span>
                    <span className={styles.statPoint}>•</span>
                    <span className={styles.statPoint}><b>&lt; 50 ms</b> Пинг</span>
                    <span className={styles.statPoint}>•</span>
                    <span className={styles.statPoint}><b>0</b> Логов</span>
                </div>
            </div>
        </section>
    );
}

export default Hero