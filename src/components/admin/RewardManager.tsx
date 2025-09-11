import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Reward } from "@/types/admin";

interface RewardManagerProps {
  rewards: Reward[];
  onRewardsChange: (rewards: Reward[]) => void;
}

export function RewardManager({ rewards, onRewardsChange }: RewardManagerProps) {
  const { toast } = useToast();
  const [newReward, setNewReward] = useState({ 
    title: "", 
    description: "", 
    points: 0, 
    category: "tecnologia" 
  });

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

    onRewardsChange([...rewards, reward]);
    setNewReward({ title: "", description: "", points: 0, category: "tecnologia" });
    toast({ title: "Sucesso", description: "Recompensa adicionada com sucesso!" });
  };

  const removeReward = (id: number) => {
    onRewardsChange(rewards.filter(r => r.id !== id));
    toast({ title: "Sucesso", description: "Recompensa removida!" });
  };

  return (
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
  );
}