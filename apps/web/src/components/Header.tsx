import { data } from "../content/data";
import logo from '../assets/logo.png';

type Props = {
    onOpenTrial: () => void
}

const Header: React.FC<Props> = ({ onOpenTrial }) => {
    return (
        <header className="header">
            <div className="container header-inner">
                <a href="#" className="logo-wrapper">
                    <img
                        src={logo}
                        alt={data.brand.name}
                        className="logo-img"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="logo-text">{data.brand.name}</span>
                </a>
                <nav className="nav">
                    {data.header.nav.map((item, idx) => (
                        <a key={idx} href={item.href}>{item.label}</a>
                    ))}
                </nav>
                <button onClick={onOpenTrial} className="btn btn-primary">
                    {data.header.cta}
                </button>
            </div>
        </header>
    );
}

export default Header