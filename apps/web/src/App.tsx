import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrialModal from "./components/TrialModal";
import Features from "./components/Features";
import Locations from "./components/Locations";
import Pricing from "./components/Pricing";
import Steps from "./components/Steps";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
    const [isTrialOpen, setIsTrialOpen] = useState(false);

    return (
        <>
            <Header onOpenTrial={() => setIsTrialOpen(true)} />
            <main>
                <Hero onOpenTrial={() => setIsTrialOpen(true)} />
                <Features />
                <Locations />
                <Pricing />
                <Steps />
                <FAQ />
            </main>
            <Footer />

            <TrialModal
                isOpen={isTrialOpen}
                onClose={() => setIsTrialOpen(false)}
            />
        </>
    );
}