import { data } from "../content/data";

export default function Steps() {
    const { steps } = data;

    return (
        <section id="steps" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{steps.title}</h2>
                </div>
                <div className="steps-grid">
                    {steps.items.map((st, idx) => (
                        <div key={idx} className="card step-card">
                            <div className="step-num">{st.step}</div>
                            <h3>{st.title}</h3>
                            <p>{st.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}