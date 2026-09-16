import { data } from "../../content/data";
import styles from './index.module.css'

export const Locations = () => {
    const { locations } = data;

    return (
        <section id="locations" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{locations.title}</h2>
                    <p className={styles.sectionSubtitle}>{locations.subtitle}</p>
                </div>
                <div className={styles.locationsGrid}>
                    {locations.list.map((loc, idx) => (
                        <div key={idx} className={styles.locCard}>
                            <div className={styles.locInfo}>
                                <span className={styles.locFlag}>{loc.flag}</span>
                                <div>
                                    <div className={styles.locName}>{loc.country}</div>
                                    <div className={styles.locCity}>{loc.city}</div>
                                </div>
                            </div>
                            <div className={styles.locPing}>
                                <span className={styles.pingDot}></span>
                                <span>{loc.ping}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}