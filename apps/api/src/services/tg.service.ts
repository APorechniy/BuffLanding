import { type Tariff } from '@buffvpn/shared';
import { env } from '../config/env';
import { Bot } from 'node-telegram-bot-api'

type SendNotificationProps = {
    clientEmail: string,
    tariff: Tariff
}

export class TgService {
    private botToken = env.BOT_TOKEN;
    private chatId = env.SUPPORT_CHAT_ID;
    private botInstance: Bot;

    constructor() {
        this.botInstance = new Bot(this.botToken);
    }

    async sendTgNotification({ clientEmail, tariff }: SendNotificationProps): Promise<boolean> {
        const text = `🎉 *Новая оплата подписки!*\n\n` +
            `📦 *Тариф:* ${tariff.name}\n` +
            `📧 *Email:* \`${clientEmail}\`\n\n`;

        console.log(this.botToken)
        console.log(this.chatId)
        try {
            await this.botInstance.api.sendMessage({
                chat_id: this.chatId,
                text: text,
                parse_mode: "Markdown",
            })

            return true;
        } catch (err) {
            console.error('Error while send TG notify:', err);
            return false;
        }
    }
}

export const tgService = new TgService();