import { useState } from "react";
import { ArrowLeft, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SurveyFormProps {
  onBack: () => void;
}

export function SurveyForm({ onBack }: SurveyFormProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const questions = [
    {
      id: "satisfaction",
      text: "Como você avalia sua satisfação geral com a empresa?",
      type: "rating"
    },
    {
      id: "environment",
      text: "O ambiente de trabalho é colaborativo e produtivo?",
      type: "rating"
    },
    {
      id: "growth",
      text: "Você sente que há oportunidades de crescimento?",
      type: "rating"
    },
    {
      id: "feedback",
      text: "Deixe seus comentários e sugestões:",
      type: "text"
    }
  ];

  const handleRatingClick = (questionId: string, rating: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: rating }));
  };

  const handleTextChange = (questionId: string, text: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Pesquisa enviada! 🎉",
        description: "Obrigado pela participação! Você ganhou 50 pontos.",
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
          <h2 className="text-2xl font-bold">Pesquisa de Satisfação</h2>
          <p className="text-muted-foreground">Sua opinião é muito importante para nós!</p>
        </div>
      </div>

      <Card className="bg-gradient-card border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Responda algumas perguntas</CardTitle>
          <CardDescription>
            Ganhe 50 pontos ao completar esta pesquisa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label className="text-base font-medium">
                  {question.text}
                </Label>
                
                {question.type === "rating" ? (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        type="button"
                        variant={answers[question.id] === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleRatingClick(question.id, rating)}
                        className={`flex items-center gap-1 ${
                          answers[question.id] === rating 
                            ? "bg-brand-primary hover:bg-brand-primary/90" 
                            : ""
                        }`}
                      >
                        <Star className="h-4 w-4" />
                        {rating}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Textarea
                    placeholder="Escreva seus comentários aqui..."
                    value={answers[question.id] || ""}
                    onChange={(e) => handleTextChange(question.id, e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-brand-primary hover:bg-brand-primary/90"
                disabled={loading}
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Pesquisa
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
    </div>
  );
}