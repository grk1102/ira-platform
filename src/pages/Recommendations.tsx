import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { useIra } from '@/contexts/IraContext';
import { Apple, Music, Palette, ChevronRight } from 'lucide-react';

interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  category: string;
}

const foodRecommendations: RecommendationCard[] = [
  { id: 'f1', title: 'Warm herbal tea', description: 'Chamomile or lavender to calm the nervous system.', category: 'Calming' },
  { id: 'f2', title: 'Dark leafy greens', description: 'Rich in magnesium for stress reduction.', category: 'Energy' },
  { id: 'f3', title: 'Omega-rich fish', description: 'Salmon or mackerel support brain health.', category: 'Focus' },
  { id: 'f4', title: 'Berries', description: 'Antioxidants to reduce inflammation and improve mood.', category: 'Mood' },
];

const musicRecommendations: RecommendationCard[] = [
  { id: 'm1', title: 'Ambient soundscapes', description: 'Brian Eno, Sigur Rós for deep relaxation.', category: 'Calm' },
  { id: 'm2', title: 'Lo-fi beats', description: 'Gentle rhythms for focus without distraction.', category: 'Focus' },
  { id: 'm3', title: 'Nature sounds', description: 'Rain, ocean waves, forest ambiance.', category: 'Grounding' },
  { id: 'm4', title: 'Acoustic instrumental', description: 'Soft guitar or piano for emotional processing.', category: 'Reflect' },
];

const hobbyRecommendations: RecommendationCard[] = [
  { id: 'h1', title: 'Gentle stretching', description: '5-10 minutes to release physical tension.', category: 'Body' },
  { id: 'h2', title: 'Journaling', description: 'Free-write for 10 minutes without judgment.', category: 'Mind' },
  { id: 'h3', title: 'Nature walk', description: 'Even 15 minutes outdoors shifts perspective.', category: 'Reset' },
  { id: 'h4', title: 'Creative doodling', description: 'No goal, just movement and color.', category: 'Expression' },
];

const RecommendationsPage = () => {
  const { questionnaire, exploreRecommendation } = useIra();

  const getPersonalizedFoodRecs = () => {
    const recs = [...foodRecommendations];
    const { emotionalStates, energyLevel } = questionnaire;
    
    if (emotionalStates.includes('anxious') || emotionalStates.includes('stressed')) {
      // Prioritize calming foods
      recs.sort((a, b) => (a.category === 'Calming' ? -1 : b.category === 'Calming' ? 1 : 0));
    }
    if (energyLevel === 'drained') {
      recs.sort((a, b) => (a.category === 'Energy' ? -1 : b.category === 'Energy' ? 1 : 0));
    }
    
    return recs.slice(0, 3);
  };

  const getPersonalizedMusicRecs = () => {
    const recs = [...musicRecommendations];
    const { emotionalStates, helpfulActivities } = questionnaire;
    
    if (emotionalStates.includes('overthinking')) {
      recs.sort((a, b) => (a.category === 'Grounding' ? -1 : b.category === 'Grounding' ? 1 : 0));
    }
    if (helpfulActivities.includes('silence')) {
      recs.sort((a, b) => (a.category === 'Calm' ? -1 : b.category === 'Calm' ? 1 : 0));
    }
    
    return recs.slice(0, 3);
  };

  const getPersonalizedHobbyRecs = () => {
    const recs = [...hobbyRecommendations];
    const { helpfulActivities, lifestyleHabits } = questionnaire;
    
    if (helpfulActivities.includes('movement') || lifestyleHabits.includes('exercise')) {
      recs.sort((a, b) => (a.category === 'Body' ? -1 : b.category === 'Body' ? 1 : 0));
    }
    if (helpfulActivities.includes('writing')) {
      recs.sort((a, b) => (a.category === 'Mind' ? -1 : b.category === 'Mind' ? 1 : 0));
    }
    if (helpfulActivities.includes('nature')) {
      recs.sort((a, b) => (a.category === 'Reset' ? -1 : b.category === 'Reset' ? 1 : 0));
    }
    
    return recs.slice(0, 3);
  };

  const handleExplore = () => {
    exploreRecommendation();
  };

  const sections = [
    {
      id: 'food',
      title: 'Food for your mood',
      icon: Apple,
      iconBg: 'bg-ira-sage-soft',
      items: getPersonalizedFoodRecs(),
    },
    {
      id: 'music',
      title: 'Sounds to settle',
      icon: Music,
      iconBg: 'bg-ira-mist-soft',
      items: getPersonalizedMusicRecs(),
    },
    {
      id: 'hobbies',
      title: 'Activities that help',
      icon: Palette,
      iconBg: 'bg-ira-lavender-soft',
      items: getPersonalizedHobbyRecs(),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-14 pb-16">
        <div className="ira-container py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Recommendations
            </h1>
            <p className="text-muted-foreground">
              Personalized suggestions based on how you feel.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => {
              const Icon = section.icon;
              
              return (
                <motion.section
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + sectionIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <h2 className="text-lg font-medium text-foreground">{section.title}</h2>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + sectionIndex * 0.1 + index * 0.05 }}
                        onClick={handleExplore}
                        className="w-full ira-card-flat flex items-center justify-between text-left group hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-medium text-foreground">
                              {item.title}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationsPage;