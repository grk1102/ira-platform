import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { WhatIsIraSection } from '@/components/home/WhatIsIraSection';
import { GuidedPathSection } from '@/components/home/GuidedPathSection';
import { EmotionalCardsSection } from '@/components/home/EmotionalCardsSection';
import { ChatbotSection } from '@/components/home/ChatbotSection';
import { SafetySection } from '@/components/home/SafetySection';
import { CTASection } from '@/components/home/CTASection';
import { EmotionalCheckinModal } from '@/components/EmotionalCheckinModal';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EmotionalCheckinModal />
      
      <main>
        <HeroSection />
        <WhatIsIraSection />
        <GuidedPathSection />
        <EmotionalCardsSection />
        <ChatbotSection />
        <SafetySection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
