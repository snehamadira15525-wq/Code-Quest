import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import { Navbar } from './components/common/Navbar.js';
import { Sidebar } from './components/common/Sidebar.js';
import { MobileNav } from './components/common/MobileNav.js';
import { AuthModal } from './components/common/AuthModal.js';
import { LandingPage } from './pages/LandingPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { LearningPathPage } from './pages/LearningPathPage.js';
import { TopicPage } from './pages/TopicPage.js';
import { GamesHubPage } from './pages/GamesHubPage.js';
import { ChallengesPage } from './pages/ChallengesPage.js';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage.js';
import { DailyChallengePage } from './pages/DailyChallengePage.js';
import { LeaderboardPage } from './pages/LeaderboardPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { GameContainer } from './components/games/GameContainer.js';
import { GameInfo } from './types/index.js';

function MainApp() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<string>('landing');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('py-variables');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('ch-sum-two-numbers');
  const [activeGame, setActiveGame] = useState<GameInfo | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Auto navigate to dashboard if user logs in while on landing
  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActivePage('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
    setActivePage('challenge-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchGame = async (gameId: string) => {
    try {
      const res = await fetch(`/api/games/${gameId}`);
      if (res.ok) {
        const data = await res.json();
        setActiveGame(data.game);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onNavigate={handleNavigate}
        activePage={activePage}
      />

      <div className="flex flex-1">
        {!isLanding && <Sidebar activePage={activePage} onNavigate={handleNavigate} />}

        <main className={`flex-1 ${!isLanding ? 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8' : ''}`}>
          {isLanding && (
            <LandingPage
              onStartLearning={() => handleNavigate('dashboard')}
              onExploreGames={() => handleNavigate('games')}
            />
          )}

          {activePage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onSelectTopic={handleSelectTopic}
              onLaunchGame={handleLaunchGame}
            />
          )}

          {activePage === 'learning-path' && (
            <LearningPathPage onSelectTopic={handleSelectTopic} />
          )}

          {activePage === 'topic' && (
            <TopicPage
              topicId={selectedTopicId}
              onBack={() => handleNavigate('learning-path')}
              onLaunchGame={handleLaunchGame}
            />
          )}

          {activePage === 'games' && <GamesHubPage onLaunchGame={handleLaunchGame} />}

          {activePage === 'challenges' && (
            <ChallengesPage onSelectChallenge={handleSelectChallenge} />
          )}

          {activePage === 'challenge-detail' && (
            <ChallengeDetailPage
              challengeId={selectedChallengeId}
              onBack={() => handleNavigate('challenges')}
            />
          )}

          {activePage === 'daily' && <DailyChallengePage />}

          {activePage === 'leaderboard' && <LeaderboardPage />}

          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>

      {!isLanding && <MobileNav activePage={activePage} onNavigate={handleNavigate} />}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {activeGame && (
        <GameContainer game={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
