import { FileText, Users, Gift, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  userName?: string;
  points?: number;
  onNavigate: (view: string) => void;
}

export function Dashboard({ userName, points = 0, onNavigate }: DashboardProps) {
  const progressToNext = (points % 100);
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          Olá, {userName || "Colaborador"}! 👋
        </h2>
        <p className="text-muted-foreground mt-2">
          Que bom te ver aqui! Vamos engajar juntos?
        </p>
      </div>

      {/* Points Progress */}
      <Card className="bg-gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-primary" />
            Seus Pontos
          </CardTitle>
          <CardDescription>
            Você está a {100 - progressToNext} pontos do próximo nível!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{Math.floor(points / 100) * 100}</span>
              <span>{Math.floor(points / 100 + 1) * 100}</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onNavigate('survey')}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
              <FileText className="h-6 w-6 text-brand-primary" />
            </div>
            <CardTitle className="text-xl">Pesquisas</CardTitle>
            <CardDescription>
              Responda pesquisas e ganhe pontos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
              Responder Pesquisa
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onNavigate('referral')}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <Users className="h-6 w-6 text-success" />
            </div>
            <CardTitle className="text-xl">Indicações</CardTitle>
            <CardDescription>
              Indique colegas e ganhe mais pontos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Fazer Indicação
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onNavigate('rewards')}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">
              <Gift className="h-6 w-6 text-brand-accent" />
            </div>
            <CardTitle className="text-xl">Recompensas</CardTitle>
            <CardDescription>
              Troque seus pontos por prêmios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-black">
              Ver Recompensas
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onNavigate('materials')}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-xl">Materiais</CardTitle>
            <CardDescription>
              Acesse documentos e manuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Ver Materiais
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Pesquisa de satisfação respondida</span>
              <span className="text-success">+50 pontos</span>
            </div>
            <div className="flex justify-between">
              <span>Indicação de novo colaborador</span>
              <span className="text-success">+100 pontos</span>
            </div>
            <div className="flex justify-between">
              <span>Login diário</span>
              <span className="text-success">+10 pontos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}