import { useState } from "react";
import { ArrowLeft, Gift, Award, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface RewardsShopProps {
  onBack: () => void;
  userPoints: number;
}

export function RewardsShop({ onBack, userPoints = 0 }: RewardsShopProps) {
  const [loading, setLoading] = useState<number | null>(null);
  const { toast } = useToast();

  const rewards = [
    {
      id: 1,
      title: "Vale Combustível R$ 50",
      description: "Vale combustível para abastecer seu veículo",
      points: 500,
      category: "Transporte",
      available: true
    },
    {
      id: 2,
      title: "Voucher Almoço R$ 30",
      description: "Vale para almoço em restaurantes credenciados",
      points: 300,
      category: "Alimentação",
      available: true
    },
    {
      id: 3,
      title: "Fone de Ouvido Bluetooth",
      description: "Fone de ouvido sem fio de alta qualidade",
      points: 800,
      category: "Tecnologia",
      available: true
    },
    {
      id: 4,
      title: "Dia de Folga Extra",
      description: "Um dia adicional de descanso",
      points: 1000,
      category: "Benefícios",
      available: true
    },
    {
      id: 5,
      title: "Curso Online Premium",
      description: "Acesso a plataforma de cursos por 3 meses",
      points: 600,
      category: "Educação",
      available: true
    },
    {
      id: 6,
      title: "Kit Home Office",
      description: "Mouse ergonômico + suporte para notebook",
      points: 700,
      category: "Tecnologia",
      available: false
    }
  ];

  const handleRedeem = async (rewardId: number, points: number) => {
    if (userPoints < points) {
      toast({
        title: "Pontos insuficientes",
        description: "Você não tem pontos suficientes para este prêmio.",
        variant: "destructive"
      });
      return;
    }

    setLoading(rewardId);

    // Simulate API call
    setTimeout(() => {
      setLoading(null);
      toast({
        title: "Prêmio resgatado! 🎉",
        description: "Seu prêmio será processado em até 2 dias úteis.",
      });
    }, 1500);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Transporte": "bg-blue-100 text-blue-800",
      "Alimentação": "bg-green-100 text-green-800",
      "Tecnologia": "bg-purple-100 text-purple-800",
      "Benefícios": "bg-orange-100 text-orange-800",
      "Educação": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Loja de Recompensas</h2>
          <p className="text-muted-foreground">Troque seus pontos por prêmios incríveis!</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-brand-accent font-bold text-lg">
            <Award className="h-5 w-5" />
            {userPoints} pontos
          </div>
          <p className="text-sm text-muted-foreground">Saldo disponível</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <Card key={reward.id} className={`relative ${!reward.available ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{reward.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {reward.description}
                  </CardDescription>
                </div>
                <Gift className="h-6 w-6 text-brand-accent flex-shrink-0 ml-2" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <Badge className={getCategoryColor(reward.category)}>
                  {reward.category}
                </Badge>
                <div className="text-right">
                  <div className="font-bold text-lg text-brand-primary">
                    {reward.points}
                  </div>
                  <div className="text-xs text-muted-foreground">pontos</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {reward.available ? (
                <Button 
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 text-black"
                  onClick={() => handleRedeem(reward.id, reward.points)}
                  disabled={loading === reward.id || userPoints < reward.points}
                >
                  {loading === reward.id ? (
                    "Processando..."
                  ) : userPoints < reward.points ? (
                    "Pontos insuficientes"
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Resgatar
                    </>
                  )}
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Indisponível
                </Button>
              )}
            </CardContent>
            {!reward.available && (
              <div className="absolute inset-0 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <Badge variant="secondary">Em breve</Badge>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="bg-brand-primary/5 border-brand-primary/20">
        <CardContent className="pt-6">
          <div className="text-sm space-y-2 text-brand-primary">
            <p className="font-medium">📋 Como funciona:</p>
            <ul className="space-y-1 ml-4">
              <li>• Acumule pontos participando de pesquisas e fazendo indicações</li>
              <li>• Troque seus pontos por recompensas na loja</li>
              <li>• Os prêmios físicos são entregues em até 5 dias úteis</li>
              <li>• Vouchers são enviados por email</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}