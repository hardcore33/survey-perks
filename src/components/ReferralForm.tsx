import { useState } from "react";
import { ArrowLeft, UserPlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ReferralFormProps {
  onBack: () => void;
}

export function ReferralForm({ onBack }: ReferralFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e email da pessoa indicada.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Indicação registrada! 🎉",
        description: "Obrigado pela indicação! Você ganhou 100 pontos.",
      });
      onBack();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Indicar Colaborador</h2>
          <p className="text-muted-foreground">Ajude a empresa a crescer com bons profissionais!</p>
        </div>
      </div>

      <Card className="bg-gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-success" />
            Nova Indicação
          </CardTitle>
          <CardDescription>
            Ganhe 100 pontos por cada indicação que resultar em contratação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Cargo de interesse</Label>
              <Input
                id="position"
                placeholder="Ex: Desenvolvedor Frontend"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Por que você indica esta pessoa?</Label>
              <textarea
                id="message"
                className="w-full p-3 border rounded-md resize-none min-h-[100px] transition-all focus:ring-2 focus:ring-brand-primary"
                placeholder="Conte-nos sobre as qualidades e experiências desta pessoa..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-success hover:bg-success/90"
                disabled={loading}
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Indicação
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-success/5 border-success/20">
        <CardContent className="pt-6">
          <div className="text-sm space-y-2 text-success">
            <p className="font-medium">💡 Dica importante:</p>
            <p>
              As indicações passam por nosso processo de recrutamento normal. 
              Você receberá pontos extras se a pessoa for contratada!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}