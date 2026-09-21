export const useCryptedEmail = () => {
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const storageKey = "BUFF_ID"

    const bytesToBase64 = (bytes: Uint8Array): string => {
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    const base64ToBytes = (b64: string): Uint8Array | null => {
        try {
            const binary = atob(b64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

    const crypt = (text: string): string => {
        if (!secretKey) {
            throw new Error("Ключ не может быть пустым");
        }

        const textBytes = new TextEncoder().encode(text);
        const keyBytes = new TextEncoder().encode(secretKey);
        const keyLen = keyBytes.length;

        const encrypted = new Uint8Array(textBytes.length);
        for (let i = 0; i < textBytes.length; i++) {
            encrypted[i] = textBytes[i] ^ keyBytes[i % keyLen];
        }

        return bytesToBase64(encrypted);
    }

    function decrypt(cipher: string): string | null {
        if (!secretKey) {
            throw new Error("Ключ не может быть пустым");
        }

        const encrypted = base64ToBytes(cipher);

        if (!encrypted) {
            console.error("Ошибка при кодировании");
            return null
        }

        const keyBytes = new TextEncoder().encode(secretKey);
        const keyLen = keyBytes.length;

        const decrypted = new Uint8Array(encrypted.length);

        for (let i = 0; i < encrypted.length; i++) {
            decrypted[i] = encrypted[i] ^ keyBytes[i % keyLen];
        }

        return new TextDecoder().decode(decrypted);
    }

    const handleSaveEmail = (email: string) => {
        const cypherEmail = crypt(email);

        localStorage.setItem(storageKey, cypherEmail);
    }

    const handleGetEmail = () => {
        const cypherEmail = localStorage.getItem(storageKey)

        if (!cypherEmail) {
            return null
        } else {
            const decryptedEmail = decrypt(cypherEmail)

            return decryptedEmail
        }
    }

    return {
        handleGetEmail,
        handleSaveEmail,
        crypt,
    }
}