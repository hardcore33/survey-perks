import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { AdminStats } from "@/components/admin/AdminStats";
import { QuestionManager } from "@/components/admin/QuestionManager";
import { RewardManager } from "@/components/admin/RewardManager";
import { RewardRequestManager } from "@/components/admin/RewardRequestManager";
import { UserManager } from "@/components/admin/UserManager";
import { MaterialManager } from "@/components/admin/MaterialManager";
import { Question, Reward, User, Material, RewardRequest } from "@/types/admin";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  // Mock data - em produção viria do Supabase
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "Como você avalia o ambiente de trabalho?", type: "rating", points: 100 },
    { id: 2, text: "O que podemos melhorar na empresa?", type: "text", points: 150 },
    { id: 3, text: "Você recomendaria nossa empresa?", type: "rating", points: 100 }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, title: "Vale Refeição", description: "R$ 50 em vale refeição", points: 500, category: "alimentacao" },
    { id: 2, title: "Fone Bluetooth", description: "Fone sem fio premium", points: 1200, category: "tecnologia" },
    { id: 3, title: "Day Off", description: "Um dia de folga extra", points: 2000, category: "beneficios" }
  ]);

  const [users] = useState<User[]>([
    { id: 1, name: "Ana Silva", email: "ana@empresa.com", points: 850, surveys: 5, referrals: 2 },
    { id: 2, name: "João Santos", email: "joao@empresa.com", points: 1200, surveys: 8, referrals: 3 },
    { id: 3, name: "Maria Costa", email: "maria@empresa.com", points: 650, surveys: 3, referrals: 1 }
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    { 
      id: 1, 
      title: "Manual do Colaborador", 
      description: "Guia completo para novos funcionários",
      type: "manual",
      content: "Este manual contém todas as informações necessárias para integração de novos colaboradores...",
      createdAt: "2024-01-15T10:00:00Z"
    },
    { 
      id: 2, 
      title: "Protocolo de Atendimento", 
      description: "Diretrizes para atendimento ao cliente",
      type: "atendimento",
      content: "Siga estas etapas para garantir um atendimento de qualidade...",
      createdAt: "2024-01-20T14:30:00Z"
    }
  ]);

  const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>([
    {
      id: 1,
      userId: 1,
      userName: "Ana Silva",
      userEmail: "ana@empresa.com",
      rewardId: 1,
      rewardTitle: "Vale Refeição",
      rewardPoints: 500,
      status: "pending",
      requestedAt: "2024-01-22T09:30:00Z"
    },
    {
      id: 2,
      userId: 2,
      userName: "João Santos",
      userEmail: "joao@empresa.com",
      rewardId: 2,
      rewardTitle: "Fone Bluetooth",
      rewardPoints: 1200,
      status: "pending",
      requestedAt: "2024-01-21T14:15:00Z"
    },
    {
      id: 3,
      userId: 3,
      userName: "Maria Costa",
      userEmail: "maria@empresa.com",
      rewardId: 1,
      rewardTitle: "Vale Refeição",
      rewardPoints: 500,
      status: "approved",
      requestedAt: "2024-01-20T11:00:00Z",
      processedAt: "2024-01-20T16:30:00Z"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie pesquisas, recompensas e usuários</p>
        </div>
      </div>

      <AdminStats users={users} />

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="reward-requests">Solicitações</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <QuestionManager 
            questions={questions} 
            onQuestionsChange={setQuestions} 
          />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <RewardManager 
            rewards={rewards} 
            onRewardsChange={setRewards} 
          />
        </TabsContent>

        <TabsContent value="reward-requests" className="space-y-4">
          <RewardRequestManager 
            requests={rewardRequests} 
            onRequestsChange={setRewardRequests} 
          />
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <MaterialManager 
            materials={materials} 
            onMaterialsChange={setMaterials} 
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManager users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}