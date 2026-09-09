import { data } from "../content/data";

export default function Features() {
    const { features } = data;

    return (
        <section id="features" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{features.title}</h2>
                    <p className="section-subtitle">{features.subtitle}</p>
                </div>
                <div className="features-grid">
                    {features.items.map((item, idx) => (
                        <div key={idx} className="card feature-box">
                            <div className="feature-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}