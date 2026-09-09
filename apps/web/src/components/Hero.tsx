import { data } from "../content/data";

type Props = {
    onOpenTrial: () => void
}

const Hero: React.FC<Props> = ({ onOpenTrial }) => {
    const { hero } = data;

    return (
        <section className="hero">
            <div className="hero-glow"></div>
            <div className="container">
                <div className="badge">{hero.badge}</div>
                <h1 className="hero-title">{hero.title}</h1>
                <p className="hero-desc">{hero.description}</p>
                <div className="hero-actions">
                    <button onClick={onOpenTrial} className="btn btn-primary">
                        {hero.primaryCta}
                    </button>
                    <a href="#pricing" className="btn btn-secondary">
                        {hero.secondaryCta}
                    </a>
                </div>
                <div className="stats-grid">
                    {hero.stats.map((st, idx) => (
                        <div key={idx} className="card stat-item">
                            <div className="stat-num">{st.value}</div>
                            <div className="stat-name">{st.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero