import { useState } from "react";
import Hero from "./components/Hero";
import TrialModal from "./components/TrialModal";
import Features from "./components/Features";
import Locations from "./components/Locations";
import { Pricing } from "./components/Pricing";
import Steps from "./components/Steps";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { PaymentModal } from "./components/PaymentModal";
import { Tariff } from "@buffvpn/shared";

export default function App() {
    const [isTrialOpen, setIsTrialOpen] = useState(false);
    const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

    return (
        <>
            <main>
                <Hero />
                <Features />
                <Pricing onSelectTariff={(tariff) => setSelectedTariff(tariff)} onOpenTrial={() => setIsTrialOpen(true)} />
                <Locations />
                <Steps />
                <FAQ />
            </main>
            <Footer />

            <TrialModal
                isOpen={isTrialOpen}
                onClose={() => setIsTrialOpen(false)}
            />

            {/* Модалка оплаты подписки */}
            <PaymentModal
                isOpen={Boolean(selectedTariff)}
                onClose={() => setSelectedTariff(null)}
                selectedPlan={selectedTariff}
            />
        </>
    );
}