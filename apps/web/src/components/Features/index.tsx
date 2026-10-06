import { data } from "../../content/data";
import styles from "./index.module.css";

export const Features = () => {
    const { features } = data;

    return (
        <section id="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{features.title}</h2>
                    <p className="section-subtitle">{features.subtitle}</p>
                </div>
                <div className={styles.featuresGrid}>
                    {features.items.map((item, idx) => (
                        <div key={idx} className={`card ${styles.featureBox}`}>
                            <div className={styles.featureIcon}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}