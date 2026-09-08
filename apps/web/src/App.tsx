import React, { useState } from 'react';
import {
    Shield,
    Zap,
    Copy,
    Check,
    Smartphone,
    Monitor,
    Download,
    ChevronDown,
    Lock,
    Globe,
    Key,
    Sparkles,
    Send,
    HelpCircle
} from 'lucide-react';

export default function App() {
    const [telegramId, setTelegramId] = useState('');
    const [subUrl, setSubUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'windows' | 'mac'>('ios');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleGetTrial = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!telegramId) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/trial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Internal-Secret': 'pcthbmF77fE0tlDIsrSBF9eIznJ0SgPDDqzfHO8Unsu5BKtJc7Ganbrp59x5me9D',
                },
                body: JSON.stringify({ userId: Number(telegramId) }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Не удалось активировать доступ');

            setSubUrl(data.subscriptionUrl);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(subUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tariffs = [
        { id: '1m', name: '1 Месяц', price: '150 ₽', days: 30, popular: false, badge: 'Старт' },
        { id: '3m', name: '3 Месяца', price: '390 ₽', days: 90, popular: true, badge: 'Выгодно -15%' },
        { id: '6m', name: '6 Месяцев', price: '690 ₽', days: 180, popular: false, badge: 'Скидка -25%' },
        { id: '12m', name: '1 Год', price: '1 190 ₽', days: 365, popular: false, badge: 'Максимум -35%' },
    ];

    const faqs = [
        { q: 'Как подключиться после получения ссылки?', a: 'Скопируйте вашу уникальную ссылку, скачайте рекомендованное приложение для вашего устройства из раздела инструкций и вставьте ссылку в поле "Добавить подписку".' },
        { q: 'Сколько устройств можно подключить?', a: 'Одну подписку можно использовать на всех ваших личных устройствах (смартфон, ПК, планшет).' },
        { q: 'Какая скорость соединения?', a: 'Наши серверы подключены к каналам 1-10 Гбит/с без ограничений по трафику. Скорость подходит для просмотра 4K видео и онлайн-игр.' },
        { q: 'Работает ли сервис во время блокировок?', a: 'Да, мы используем современные протоколы VLESS / V2Ray с маскировкой трафика под обычный HTTPS.' }
    ];

    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">

            {/* Background Glow Effects */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

            {/* Header */}
            <header className="border-b border-stone-800/60 bg-stone-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl text-stone-950 shadow-lg shadow-amber-500/20">
                            <Shield className="w-5 h-5 font-bold" />
                        </div>
                        <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                            GOLDEN LANE
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://t.me/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
                        >
                            <Send className="w-3.5 h-3.5" />
                            Telegram Бот
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12 space-y-16 relative z-10">

                {/* Hero Section */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-medium text-amber-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        Премиальный доступ без ограничений
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Приватный и быстрый <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                            VPN интернет
                        </span>
                    </h1>
                    <p className="text-stone-400 text-sm md:text-base">
                        Защита от блокировок, высокая скорость 10 Гбит/с и полная конфиденциальность ваших данных на всех устройствах.
                    </p>
                </div>

                {/* Key Generator / Subscription Form Card */}
                <div className="max-w-xl mx-auto bg-stone-900/60 border border-amber-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-amber-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-400" />
                        Получить тестовый доступ
                    </h2>
                    <p className="text-xs text-stone-400 mb-6">
                        Введите ваш Telegram ID для бесплатного подключения на 24 часа
                    </p>

                    {!subUrl ? (
                        <form onSubmit={handleGetTrial} className="space-y-4">
                            <div>
                                <input
                                    type="number"
                                    placeholder="Ваш Telegram ID (например: 12345678)"
                                    value={telegramId}
                                    onChange={(e) => setTelegramId(e.target.value)}
                                    required
                                    className="w-full bg-stone-950/80 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-3.5 text-sm text-white placeholder-stone-600 focus:outline-none transition shadow-inner"
                                />
                            </div>

                            {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 active:scale-[0.99] disabled:opacity-50"
                            >
                                <Zap className="w-4 h-4 fill-current" />
                                {loading ? 'Формирование подписки...' : 'Активировать 24 часа бесплатно'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="p-4 bg-stone-950/90 border border-amber-500/30 rounded-2xl space-y-2">
                                <span className="text-xs text-amber-400 font-medium block">Ваша подписка успешно сформирована:</span>
                                <div className="flex items-center gap-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800">
                                    <input
                                        type="text"
                                        readOnly
                                        value={subUrl}
                                        className="bg-transparent text-xs text-amber-200 w-full focus:outline-none font-mono"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition shrink-0"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-stone-400 text-center">
                                Скопируйте ссылку и вставьте ее в клиентское приложение ниже.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tariffs Section */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-white">Тарифные планы</h2>
                        <p className="text-xs text-stone-400">Выберите подходящий период подписки</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tariffs.map((tariff) => (
                            <div
                                key={tariff.id}
                                className={`relative bg-stone-900/40 border rounded-2xl p-6 flex flex-col justify-between transition hover:border-amber-500/50 ${tariff.popular ? 'border-amber-500 bg-amber-500/[0.02] shadow-xl shadow-amber-500/5' : 'border-stone-800'
                                    }`}
                            >
                                {tariff.badge && (
                                    <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                                        {tariff.badge}
                                    </span>
                                )}

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-stone-300">{tariff.name}</h3>
                                    <div>
                                        <span className="text-3xl font-black text-white">{tariff.price}</span>
                                    </div>

                                    <ul className="space-y-2 text-xs text-stone-400 pt-2 border-t border-stone-800/60">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-amber-400" />
                                            Безлимитный трафик
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-amber-400" />
                                            Скорость до 10 Гбит/с
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-amber-400" />
                                            Доступ ко всем локациям
                                        </li>
                                    </ul>
                                </div>

                                <a
                                    href="https://t.me/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 w-full py-2.5 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 font-bold rounded-xl text-xs text-center transition"
                                >
                                    Оформить в Боте
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Setup Instructions Section */}
                <div className="space-y-6 bg-stone-900/30 border border-stone-800/80 rounded-3xl p-6 md:p-8">
                    <div className="text-center space-y-1">
                        <h2 className="text-xl font-bold text-white">Инструкция по настройке</h2>
                        <p className="text-xs text-stone-400">Подключение занимает не более 2 минут</p>
                    </div>

                    {/* Device Tabs */}
                    <div className="flex justify-center gap-2 border-b border-stone-800 pb-4">
                        <button
                            onClick={() => setActiveTab('ios')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${activeTab === 'ios' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            <Smartphone className="w-4 h-4" /> iOS
                        </button>
                        <button
                            onClick={() => setActiveTab('android')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${activeTab === 'android' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            <Smartphone className="w-4 h-4" /> Android
                        </button>
                        <button
                            onClick={() => setActiveTab('windows')}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${activeTab === 'windows' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            <Monitor className="w-4 h-4" /> Windows
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="max-w-xl mx-auto space-y-4 text-xs text-stone-300">
                        {activeTab === 'ios' && (
                            <ol className="space-y-3 list-decimal list-inside bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
                                <li>Установите приложение <strong>V2RAGE</strong> или <strong>Streisand</strong> из App Store.</li>
                                <li>Скопируйте вашу ссылку на подписку из поля выше.</li>
                                <li>Откройте приложение и нажмите кнопку <strong>«+»</strong> (Добавить подписку).</li>
                                <li>Вставьте ссылку и нажмите <strong>Подключиться</strong>.</li>
                            </ol>
                        )}

                        {activeTab === 'android' && (
                            <ol className="space-y-3 list-decimal list-inside bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
                                <li>Скачайте клиент <strong>v2rayNG</strong> из Google Play.</li>
                                <li>Скопируйте вашу ссылку на подписку.</li>
                                <li>Откройте v2rayNG ➔ Меню ➔ <strong>Настройки групп подписок</strong>.</li>
                                <li>Нажмите «+», вставьте ссылку и обновите список серверов.</li>
                            </ol>
                        )}

                        {activeTab === 'windows' && (
                            <ol className="space-y-3 list-decimal list-inside bg-stone-950/60 p-5 rounded-2xl border border-stone-800">
                                <li>Скачайте и распакуйте клиент <strong>v2rayN</strong>.</li>
                                <li>Скопируйте ссылку на подписку.</li>
                                <li>В v2rayN откройте меню <strong>Подписка</strong> ➔ Настройка групп подписок ➔ Добавить.</li>
                                <li>Включите системный прокси в нижней панели программы.</li>
                            </ol>
                        )}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                        <HelpCircle className="w-5 h-5 text-amber-400" />
                        Часто задаваемые вопросы
                    </h2>

                    <div className="space-y-2">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-4 text-left font-semibold text-xs text-stone-200 flex items-center justify-between"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-stone-400 transition transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-4 pb-4 text-xs text-stone-400 border-t border-stone-800/40 pt-2">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="border-t border-stone-800/60 bg-stone-950 py-8 text-center text-xs text-stone-500">
                <div className="max-w-6xl mx-auto px-4 space-y-2">
                    <p>© 2025 GOLDEN LANE VPN. Все права защищены.</p>
                    <p className="text-[10px] text-stone-600">Сервис предоставляет безопасный приватный доступ по протоколам VLESS / Reality.</p>
                </div>
            </footer>

        </div>
    );
}