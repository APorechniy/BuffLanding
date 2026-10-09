import { env } from "@/config/env";

type MetrikaParams = {
    cid: string;
    goalId: string;
}

/**
 * Отправляет событие (цель) в Яндекс.Метрику через Measurement Protocol
 */
export async function sendMetrikaGoal({ cid, goalId }: MetrikaParams): Promise<boolean> {
    const url = 'https://mc.yandex.ru/collect';
    const counterId = env.COUNTER_ID;
    const secretToken = env.MP_TOKEN;

    // Формируем параметры в соответствии со спецификацией Яндекса
    const queryParams = new URLSearchParams({
        tid: counterId,      // ID счетчика
        t: 'event',          // Тип события
        cid: cid,            // Идентификатор клиента
        ms: secretToken,     // Секретный токен
        ea: goalId           // Действие (название вашей цели)
    });

    const fullUrl = `${url}?${queryParams.toString()}`;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] [Metrika] Инициация отправки цели "${goalId}" для cid: ${cid}`);

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'User-Agent': 'NodeJS/Fastify Backend Server'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[${timestamp}] [Metrika Error] Ошибка сервера Яндекса. Статус: ${response.status}. Ответ: ${errorText}`);
            return false;
        }

        console.log(`[${timestamp}] [Metrika Success] Цель "${goalId}" успешно отправлена. Статус: ${response.status}`);
        return true;

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[${timestamp}] [Metrika Error] Сбой при сетевом запросе к Метрике:`, errorMessage);
        return false;
    }
}