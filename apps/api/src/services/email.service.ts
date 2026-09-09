import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { generateTrialEmail } from '@/utils/generate-email';

export class EmailService {
    private smtpHost = env.SMTP_HOST;
    private smtpPort = env.SMTP_PORT;
    private smtpUser = env.SMTP_USER;
    private smtpPass = env.SMTP_PASS;

    private get smtpConfig() {
        return nodemailer.createTransport({
            host: this.smtpHost,
            port: this.smtpPort,
            secure: true,
            auth: {
                user: this.smtpUser,
                pass: this.smtpPass,
            }
        })
    }

    async sendSubscribe(params: {
        clientEmail: string;
        sublink: string;
    }): Promise<boolean> {
        const transporter = this.smtpConfig;

        const payload = {
            from: `Buff Manager | <${this.smtpUser}>`,
            to: params.clientEmail,
            subject: "BUFF | Доступ к сервису",
            text: `Ваша ссылка: ${params.sublink}`,
            html: generateTrialEmail(params.sublink),
        };

        try {
            await transporter.sendMail(payload);

            return true;
        } catch (err) {
            console.error('Error while send sublink:', err);
            return false;
        }
    }
}

export const emailService = new EmailService();