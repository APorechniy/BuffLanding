import { env } from "@/config/env";

const base64ToBytes = (b64: string): Uint8Array => {
    return new Uint8Array(Buffer.from(b64, "base64"));
}

export const decrypt = (cipher: string): string => {
    if (!env.SECRET_KEY) {
        throw new Error("Ключ не может быть пустым");
    }

    const encrypted = base64ToBytes(cipher);
    const keyBytes = new TextEncoder().encode(env.SECRET_KEY);
    const keyLen = keyBytes.length;

    const decrypted = new Uint8Array(encrypted.length);
    for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ keyBytes[i % keyLen];
    }

    return new TextDecoder().decode(decrypted);
}