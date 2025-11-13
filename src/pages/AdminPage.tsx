import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut, checkIsAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    verifyAdmin();
  }, [user]);

  const verifyAdmin = async () => {
    if (!user) return;
    
    const adminStatus = await checkIsAdmin(user.id);
    setIsAdmin(adminStatus);
    
    if (!adminStatus) {
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Header
          userName="Administrador"
          userEmail={user?.email}
          points={0}
          isAuthenticated={!!user}
          onSignOut={handleSignOut}
        />
        <AdminDashboard onBack={handleBackToDashboard} />
      </div>
    </Layout>
  );
};

export default AdminPage;
