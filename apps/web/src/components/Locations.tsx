import { data } from "../content/data";

export default function Locations() {
    const { locations } = data;

    return (
        <section id="locations" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{locations.title}</h2>
                    <p className="section-subtitle">{locations.subtitle}</p>
                </div>
                <div className="locations-grid">
                    {locations.list.map((loc, idx) => (
                        <div key={idx} className="card loc-card">
                            <div className="loc-info">
                                <span className="loc-flag">{loc.flag}</span>
                                <div>
                                    <div className="loc-name">{loc.country}</div>
                                    <div className="loc-city">{loc.city}</div>
                                </div>
                            </div>
                            <div className="loc-ping">
                                <span className="ping-dot"></span>
                                <span>{loc.ping}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}