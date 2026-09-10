export const data = {
    brand: {
        name: "Buff VPN",
        tgBotLink: "https://t.me/BuffVPN_bot"
    },
    header: {
        nav: [
            { label: "Преимущества", href: "#features" },
            { label: "Локации", href: "#locations" },
            { label: "Тарифы", href: "#pricing" },
            { label: "Подключение", href: "#steps" },
            { label: "FAQ", href: "#faq" }
        ],
        cta: "Подключить"
    },
    hero: {
        badge: "⚡ Протокол нового поколения VLESS-Reality",
        title: "Интернет без цензуры, банов и потери скорости",
        description: "Мгновенный обход любых блокировок. Никаких лагов в играх и 4K-стриминге.",
        primaryCta: "Попробовать 1 день бесплатно",
        secondaryCta: "Тарифы",
        stats: [
            { value: "10 Gbps", label: "Ширина каналов" },
            { value: "99.98%", label: "Uptime серверов" },
            { value: "0 Logs", label: "Полная анонимность" },
            { value: "< 25 ms", label: "Средний пинг" }
        ]
    },
    osGuides: {
        ios: {
            appName: "Streisand / FoXray",
            link: "https://apps.apple.com",
            step: "Скопируйте URL подписки выше, откройте приложение и нажмите '+' -> Импорт из буфера."
        },
        android: {
            appName: "v2rayNG / Happ",
            link: "https://play.google.com",
            step: "Нажмите '+' в верхнем углу приложения и выберите 'Импорт профиля из буфера обмена'."
        },
        windows: {
            appName: "Hiddify Next / v2rayN",
            link: "#",
            step: "Нажмите 'Добавить профиль из буфера' (Ctrl + V) в главном окне программы."
        },
        mac: {
            appName: "FoXray / V2Box",
            link: "#",
            step: "Импортируйте подписку по URL и включите системный VPN-профиль."
        }
    },
    features: {
        title: "Почему выбирают Buff VPN",
        subtitle: "Мы убрали всё лишнее и оставили максимальную производительность.",
        items: [
            { icon: "🛡️", title: "Невидим для провайдеров", text: "Маскировка под обычный HTTPS-трафик." },
            { icon: "🚀", title: "Без лимита скорости", text: "Смотрите YouTube и Twitch в 4K 60FPS без задержек." },
            { icon: "📱", title: "Один ключ — все гаджеты", text: "Используйте подписку сразу на 5 устройствах." },
            { icon: "🔒", title: "Строгий No-Logs", text: "Никаких логов посещений или истории запросов." },
            { icon: "💳", title: "Оплата без проблем", text: "МИР, СБП, зарубежные карты и крипта." },
            { icon: "⚡", title: "Настройка за 1 минуту", text: "Импорт в приложение нажатием одной кнопки." }
        ]
    },
    locations: {
        title: "Серверные локации",
        subtitle: "Прямые маршруты для минимального пинга.",
        list: [
            { country: "Нидерланды", city: "Амстердам", ping: "24 ms", flag: "🇳🇱" },
            { country: "Германия", city: "Франкфурт", ping: "29 ms", flag: "🇩🇪" },
            { country: "Финляндия", city: "Хельсинки", ping: "19 ms", flag: "🇫🇮" },
            { country: "США", city: "Нью-Йорк", ping: "89 ms", flag: "🇺🇸" },
            { country: "Турция", city: "Стамбул", ping: "42 ms", flag: "🇹🇷" },
            { country: "Сингапур", city: "Сингапур", ping: "135 ms", flag: "🇸🇬" }
        ]
    },
    pricing: {
        title: "Честные тарифы",
        subtitle: "Полный функционал доступен на любом тарифе."
    },
    steps: {
        title: "Подключение за 3 шага",
        items: [
            { step: "01", title: "Укажите почту", desc: "Введите Email в форме и получите ссылку мгновенно." },
            { step: "02", title: "Скачайте клиент", desc: "Установите приложение под вашу систему (iOS, Android, ПК)." },
            { step: "03", title: "Импортируйте URL", desc: "Нажмите на ключ — профиль добавится автоматически." }
        ]
    },
    faq: {
        title: "Часто задаваемые вопросы",
        items: [
            {
                q: "Где взять мой Telegram ID?",
                a: "Откройте Telegram, найдите бота @userinfobot или @getmyid_bot, нажмите Start — бот пришлет ваш цифровой Id (например: 987654321)."
            },
            {
                q: "Работает ли сервис при жестких блокировках?",
                a: "Да, протокол VLESS-Reality мимикрирует под защищенный TLS веб-трафик и не определяется DPI-фильтрами."
            },
            {
                q: "Сколько устройств можно подключить одновременно?",
                a: "Один ключ позволяет одновременно подключать до 5 устройств."
            }
        ]
    },
    footer: {
        copy: "© 2025 Buff VPN. Все права защищены."
    }
};