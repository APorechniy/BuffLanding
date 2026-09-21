import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useCryptedEmail } from "@/hooks/use-crypted-email";

type Props = {
    clientEmail: string,
    setError: () => void,
}

const vpnClients = [
    {
        id: 1,
        name: "V2RAGE",
        link: "https://apps.apple.com/us/app/v2rage/id6761075402",
        platform: "iOS"
    },
    {
        id: 2,
        name: "Happ VPN",
        link: "https://play.google.com/store/apps/details?id=com.happproxy&pli=1",
        platform: "Android"
    },
    {
        id: 3,
        name: "Hiddify",
        link: "https://hiddify.com/",
        platform: "Windows"
    },
    {
        id: 3,
        name: "Happ VPN",
        link: "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
        platform: "MacOS"
    },
]

export const SubscribeBlock: React.FC<Props> = ({ clientEmail, setError }) => {
    const [subUrl, setSubUrl] = useState<string>()
    const [copied, setCopied] = useState<boolean>(false)

    const { crypt } = useCryptedEmail();

    useEffect(() => {
        fetchSubUrl()
    }, [clientEmail])

    const fetchSubUrl = async () => {
        if (clientEmail) {
            const clientCypher = crypt(clientEmail);

            const res = await fetch(`/api/user/subscribe?buffId=${clientCypher}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Internal-Secret":
                        import.meta.env.VITE_EXTERNAL_SECRET,
                },
            });

            if (res.ok) {
                const resBody = await res.json()

                if (resBody.success && resBody.subscriptionUrl) {
                    setSubUrl(resBody.subscriptionUrl)
                } else {
                    setError()
                }
            } else {
                setError()
            }
        } else {
            setError()
        }
    }

    const copyToClipboard = () => {
        if (!subUrl) return;
        navigator.clipboard.writeText(subUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className={styles.wrapper}>
            <div className={styles.copyBox}>
                <label className={styles.label}>Ваша ссылка подписки:</label>
                <div className={styles.copyRow}>
                    <input type="text" readOnly value={subUrl} className="custom-input read-only" />
                    <button onClick={copyToClipboard} className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
                        {copied ? "Скопировано! ✓" : "Копировать"}
                    </button>
                </div>
            </div>
            <p className={styles.paragraph}>Вставьте ее в любое клиентское приложение. <br /> Ниже приведен список самых популярных приложений для различных систем:</p>

            <div className={styles.bottomRow}>
                {vpnClients.map((client) => {
                    return (
                        <div
                            key={client.id}
                            className={styles.card}
                        >
                            <h3 className={styles.platform}>{client.platform}</h3>
                            <h4 className={styles.clientName}>{client.name}</h4>

                            <a
                                type="button"
                                className={styles.btnBuy}
                                href={client.link}
                                target="_blank"
                            >
                                Скачать
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}