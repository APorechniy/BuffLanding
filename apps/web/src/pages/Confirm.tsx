import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { useCryptedEmail } from "@/hooks/use-crypted-email";
import { SubscribeBlock } from "@/components/SubscribeBlock";
import { EmptySubscribeBlock } from "@/components/EmptySubscribeBlock";

export default function Confirm() {
    const [isTrialOpen, setIsTrialOpen] = useState(false);
    const [clientEmail, setClientEmail] = useState<string | null>(null)
    const { handleGetEmail } = useCryptedEmail()

    useEffect(() => {
        const email = handleGetEmail()

        setClientEmail(email || null)
    }, [])

    const setError = () => {
        setClientEmail(null)
    }

    return (
        <>
            <main>
                <Header onOpenTrial={() => setIsTrialOpen(true)} />
                {
                    clientEmail
                        ?
                        <SubscribeBlock clientEmail={clientEmail} setError={setError} />
                        :
                        <EmptySubscribeBlock />
                }
            </main>
            <Footer />
        </>
    );
}