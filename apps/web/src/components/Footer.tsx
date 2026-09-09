import { data } from "../content/data";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>{data.footer.copy}</p>
            </div>
        </footer>
    );
}