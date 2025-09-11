import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { LoginForm } from "@/components/LoginForm";
import { SurveyForm } from "@/components/SurveyForm";
import { ReferralForm } from "@/components/ReferralForm";
import { RewardsShop } from "@/components/RewardsShop";
import { AdminDashboard } from "@/components/AdminDashboard";
import { MaterialsPage } from "@/pages/MaterialsPage";

type View = 'login' | 'dashboard' | 'survey' | 'referral' | 'rewards' | 'admin' | 'materials';

interface User {
  email: string;
  name?: string;
  points: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    // Simulate login - in real app this would come from Supabase
    const mockUser: User = {
      email,
      name: email.split('@')[0],
      points: 340
    };
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Header
          userName={user?.name}
          userEmail={user?.email}
          points={user?.points}
          isAuthenticated={!!user}
          onSignOut={handleSignOut}
          onAdminAccess={() => handleNavigate('admin')}
        />

        {currentView === 'login' && (
          <LoginForm onLogin={handleLogin} />
        )}

        {currentView === 'dashboard' && user && (
          <Dashboard
            userName={user.name}
            points={user.points}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'survey' && (
          <SurveyForm onBack={() => handleNavigate('dashboard')} />
        )}

        {currentView === 'referral' && (
          <ReferralForm onBack={() => handleNavigate('dashboard')} />
        )}

        {currentView === 'rewards' && user && (
          <RewardsShop
            userPoints={user.points}
            onBack={() => handleNavigate('dashboard')}
          />
        )}

        {currentView === 'materials' && (
          <MaterialsPage
            onBack={() => handleNavigate('dashboard')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onBack={() => handleNavigate('dashboard')}
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
