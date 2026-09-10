export interface Tariff {
    id: string;
    name: string;
    price: number;
    days: number;
    minutes: number;
    total_gb: number;
    devices: number;
    icon: string;
    featured?: boolean;
    badge?: string;
}

export const TARIFFS: Record<string, Tariff> = {
    "1": {
        id: "1",
        name: "10 минут (тебе хватит)",
        price: 13,
        days: 0,
        minutes: 13,
        total_gb: 5,
        devices: 6,
        icon: "🚶‍♂️",
        badge: "Быстрый тест",
    },
    "30": {
        id: "30",
        name: "1 месяц (30 дней)",
        price: 250,
        days: 30,
        minutes: 0,
        total_gb: 100,
        devices: 4,
        icon: "⚡",
    },
    "60": {
        id: "60",
        name: "2 месяца (60 дней)",
        price: 400,
        days: 60,
        minutes: 0,
        total_gb: 200,
        devices: 6,
        icon: "💎",
        featured: true,
        badge: "Выгодно 🔥",
    },
    "90": {
        id: "90",
        name: "3 месяца (90 дней)",
        price: 700,
        days: 90,
        minutes: 0,
        total_gb: 500,
        devices: 10,
        icon: "👑",
        badge: "Максимум",
    },
};