import { data } from "../content/data";

export default function Pricing() {
    const { pricing, brand } = data;

    return (
        <section id="pricing" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{pricing.title}</h2>
                    <p className="section-subtitle">{pricing.subtitle}</p>
                </div>
                <div className="pricing-grid">
                    {pricing.plans.map((p, idx) => (
                        <div key={idx} className={`card price-card ${p.featured ? "featured" : ""}`}>
                            {p.badge && <div className="price-badge">{p.badge}</div>}
                            <h3 className="price-title">{p.name}</h3>
                            <p className="price-desc">{p.desc}</p>
                            <div className="price-cost">{p.price}</div>
                            <div className="price-period">{p.period}</div>
                            <ul className="price-features">
                                {p.features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                            <a
                                href={brand.tgBotLink}
                                target="_blank"
                                rel="noreferrer"
                                className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`}
                            >
                                Подключить
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}