import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
const envSchema = z.object({
    PORT: z.string().transform(Number).default('3000'),
    DATABASE_URL: z.string(),
    // Преобразуем строку "True" / "true" в boolean
    PAYMENT_ENABLED: z
        .string()
        .transform((val) => val.toLowerCase() === 'true')
        .default('true'),
    INTERNAL_API_SECRET: z.string(),
    // 3X-UI Panel Config
    XUI_URL: z.string().url(),
    XUI_TOKEN: z.string(),
    XUI_SUB_BASE_URL: z.string().url(),
    // Преобразуем "6,7,8,9" в [6, 7, 8, 9]
    XUI_INBOUND_IDS: z
        .string()
        .default('1')
        .transform((val) => val
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((num) => !isNaN(num)))
        .refine((arr) => arr.length > 0, {
        message: 'XUI_INBOUND_IDS должен содержать хотя бы один ID (число)',
    }),
    // Payments Config
    PAYMENT_WEBHOOK_URL: z.string().url(),
    PAYMENT_URL: z.string().url(),
    PAYMENT_SHOP_ID: z.string(),
    PAYMENT_API_KEY: z.string(),
    PAYMENT_CALLBACK_KEY: z.string(),
});
export const env = envSchema.parse(process.env);
