import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types/admin";

interface QuestionManagerProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

export function QuestionManager({ questions, onQuestionsChange }: QuestionManagerProps) {
  const { toast } = useToast();
  const [newQuestion, setNewQuestion] = useState<{ text: string; type: "rating" | "text"; points: number }>({ 
    text: "", 
    type: "rating",
    points: 100
  });

  const addQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({ title: "Erro", description: "Digite uma pergunta válida", variant: "destructive" });
      return;
    }
    
    if (newQuestion.points <= 0) {
      toast({ title: "Erro", description: "A pontuação deve ser maior que zero", variant: "destructive" });
      return;
    }

    const question: Question = {
      id: Date.now(),
      text: newQuestion.text,
      type: newQuestion.type,
      points: newQuestion.points
    };

    onQuestionsChange([...questions, question]);
    setNewQuestion({ text: "", type: "rating", points: 100 });
    toast({ title: "Sucesso", description: "Pergunta adicionada com sucesso!" });
  };

  const removeQuestion = (id: number) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
    toast({ title: "Sucesso", description: "Pergunta removida!" });
  };

  return (
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
          <div className="grid gap-2">
            <Label htmlFor="question-points">Pontuação</Label>
            <Input
              id="question-points"
              type="number"
              placeholder="100"
              value={newQuestion.points}
              onChange={(e) => setNewQuestion({ ...newQuestion, points: Number(e.target.value) })}
              min="1"
            />
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
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">
                    {question.type === 'rating' ? 'Avaliação' : 'Texto'}
                  </Badge>
                  <Badge variant="secondary">{question.points} pontos</Badge>
                </div>
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
  );
}