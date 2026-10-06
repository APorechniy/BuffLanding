import { useState } from "react";
import { data } from "../../content/data";

import styles from './index.module.css'

export const FAQ = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <section id="faq">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{data.faq.title}</h2>
                </div>
                <div className={styles.faqList}>
                    {data.faq.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`card ${styles.faqItem} ${openIdx === idx ? styles.active : ""}`}
                            onClick={() => toggle(idx)}
                        >
                            <div className={styles.faqHeader}>
                                <span>{item.q}</span>
                                <span className={styles.faqToggle}>+</span>
                            </div>
                            <div className={styles.faqBody}>
                                <div className={styles.faqBodyInner}>
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}