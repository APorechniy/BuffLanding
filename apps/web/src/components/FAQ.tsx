import { useState } from "react";
import { data } from "../content/data";

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <section id="faq" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{data.faq.title}</h2>
                </div>
                <div className="faq-list">
                    {data.faq.items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`card faq-item ${openIdx === idx ? "active" : ""}`}
                            onClick={() => toggle(idx)}
                        >
                            <div className="faq-header">
                                <span>{item.q}</span>
                                <span className="faq-toggle">+</span>
                            </div>
                            <div className="faq-body">
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}