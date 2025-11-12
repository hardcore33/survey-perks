import { User, LogOut, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  points?: number;
  isAuthenticated: boolean;
  onSignOut?: () => void;
  onAdminAccess?: () => void;
}

export function Header({ userName, userEmail, points = 0, isAuthenticated, onSignOut, onAdminAccess }: HeaderProps) {
  const isAdmin = !!onAdminAccess; // Se onAdminAccess existe, é admin
  return (
    <Card className="bg-gradient-primary text-white border-0 shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Award className="h-7 w-7" />
              Engajamento+
            </h1>
            <p className="text-white/80 mt-1">
              Pesquisas • Indicações • Recompensas
            </p>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-brand-accent font-bold">
                  <Award className="h-5 w-5" />
                  {points} pontos
                </div>
                <div className="text-sm text-white/80">
                  {userName || userEmail}
                  {isAdmin && <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">Admin</span>}
                </div>
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onAdminAccess}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onSignOut}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white/80">
              <User className="h-5 w-5" />
              Bem-vindo!
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}