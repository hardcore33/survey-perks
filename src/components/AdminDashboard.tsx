import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit, Users, Award, MessageSquare, TrendingUp, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text';
}

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  category: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  surveys: number;
  referrals: number;
}

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { toast } = useToast();
  
  // Mock data - em produção viria do Supabase
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "Como você avalia o ambiente de trabalho?", type: "rating" },
    { id: 2, text: "O que podemos melhorar na empresa?", type: "text" },
    { id: 3, text: "Você recomendaria nossa empresa?", type: "rating" }
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

  const [newQuestion, setNewQuestion] = useState<{ text: string; type: "rating" | "text" }>({ text: "", type: "rating" });
  const [newReward, setNewReward] = useState({ title: "", description: "", points: 0, category: "tecnologia" });

  const addQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({ title: "Erro", description: "Digite uma pergunta válida", variant: "destructive" });
      return;
    }

    const question: Question = {
      id: Date.now(),
      text: newQuestion.text,
      type: newQuestion.type
    };

    setQuestions([...questions, question]);
    setNewQuestion({ text: "", type: "rating" });
    toast({ title: "Sucesso", description: "Pergunta adicionada com sucesso!" });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({ title: "Sucesso", description: "Pergunta removida!" });
  };

  const addReward = () => {
    if (!newReward.title.trim() || newReward.points <= 0) {
      toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    const reward: Reward = {
      id: Date.now(),
      title: newReward.title,
      description: newReward.description,
      points: newReward.points,
      category: newReward.category
    };

    setRewards([...rewards, reward]);
    setNewReward({ title: "", description: "", points: 0, category: "tecnologia" });
    toast({ title: "Sucesso", description: "Recompensa adicionada com sucesso!" });
  };

  const removeReward = (id: number) => {
    setRewards(rewards.filter(r => r.id !== id));
    toast({ title: "Sucesso", description: "Recompensa removida!" });
  };

  const totalUsers = users.length;
  const totalSurveys = users.reduce((sum, user) => sum + user.surveys, 0);
  const totalReferrals = users.reduce((sum, user) => sum + user.referrals, 0);
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);

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

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesquisas Respondidas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSurveys}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indicações Feitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Perguntas da Pesquisa</CardTitle>
              <CardDescription>
                Adicione ou remova perguntas que aparecerão nas pesquisas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="question-text">Nova Pergunta</Label>
                  <Textarea
                    id="question-text"
                    placeholder="Digite a pergunta..."
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="question-type">Tipo de Resposta</Label>
                  <Select value={newQuestion.type} onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value as "rating" | "text" })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Avaliação (1-5)</SelectItem>
                      <SelectItem value="text">Texto Livre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Pergunta
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Perguntas Atuais</h4>
                {questions.map((question) => (
                  <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{question.text}</p>
                      <Badge variant="outline" className="mt-1">
                        {question.type === 'rating' ? 'Avaliação' : 'Texto'}
                      </Badge>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Recompensas</CardTitle>
              <CardDescription>
                Configure as recompensas disponíveis na loja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="reward-title">Título da Recompensa</Label>
                  <Input
                    id="reward-title"
                    placeholder="Ex: Vale Presente"
                    value={newReward.title}
                    onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reward-description">Descrição</Label>
                  <Input
                    id="reward-description"
                    placeholder="Descrição detalhada..."
                    value={newReward.description}
                    onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reward-points">Pontos Necessários</Label>
                  <Input
                    id="reward-points"
                    type="number"
                    min="1"
                    value={newReward.points || ""}
                    onChange={(e) => setNewReward({ ...newReward, points: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reward-category">Categoria</Label>
                  <Select value={newReward.category} onValueChange={(value) => setNewReward({ ...newReward, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="alimentacao">Alimentação</SelectItem>
                      <SelectItem value="beneficios">Benefícios</SelectItem>
                      <SelectItem value="lazer">Lazer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addReward}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Recompensa
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Recompensas Atuais</h4>
                {rewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{reward.title}</p>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{reward.points} pontos</Badge>
                        <Badge variant="outline">{reward.category}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeReward(reward.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>
                Visualize informações dos usuários cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary">{user.points} pontos</Badge>
                        <span className="text-sm text-muted-foreground">
                          {user.surveys} pesquisas • {user.referrals} indicações
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}