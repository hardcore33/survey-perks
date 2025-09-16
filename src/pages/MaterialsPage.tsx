import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, Book, Settings, HelpCircle, Eye } from "lucide-react";
import { Material } from "@/types/admin";

interface MaterialsPageProps {
  onBack: () => void;
}

// Mock data - em produção viria do Supabase
const mockMaterials: Material[] = [
  { 
    id: 1, 
    title: "Manual do Colaborador", 
    description: "Guia completo para novos funcionários com todas as políticas e procedimentos da empresa",
    type: "manual",
    content: `# Manual do Colaborador

## Bem-vindo à nossa empresa!

Este manual contém todas as informações necessárias para sua integração e sucesso em nossa empresa.

### Horários de Trabalho
- Segunda a Sexta: 8h às 17h
- Intervalo para almoço: 12h às 13h

### Políticas da Empresa
1. **Pontualidade**: Chegue sempre no horário
2. **Dress Code**: Casual profissional
3. **Comunicação**: Use sempre os canais oficiais

### Benefícios
- Plano de saúde
- Vale refeição
- Vale transporte
- Participação nos lucros

### Contatos Importantes
- RH: rh@empresa.com
- TI: ti@empresa.com
- Emergência: (11) 99999-9999`,
    createdAt: "2024-01-15T10:00:00Z"
  },
  { 
    id: 2, 
    title: "Protocolo de Atendimento ao Cliente", 
    description: "Diretrizes e melhores práticas para atendimento de qualidade",
    type: "atendimento",
    content: `# Protocolo de Atendimento ao Cliente

## Objetivo
Garantir um atendimento de excelência que supere as expectativas dos nossos clientes.

## Etapas do Atendimento

### 1. Recepção
- Cumprimente o cliente com cordialidade
- Apresente-se pelo nome
- Demonstre interesse genuíno

### 2. Identificação da Necessidade
- Faça perguntas abertas
- Escute ativamente
- Tome notas quando necessário

### 3. Apresentação da Solução
- Explique as opções disponíveis
- Destaque os benefícios
- Seja transparente sobre custos

### 4. Fechamento
- Confirme todos os detalhes
- Esclareça próximos passos
- Agradeça a preferência

## Frases Importantes
- "Como posso ajudá-lo hoje?"
- "Entendo sua necessidade..."
- "Vou verificar isso para você"
- "Obrigado por escolher nossa empresa"`,
    createdAt: "2024-01-20T14:30:00Z"
  },
  { 
    id: 3, 
    title: "Guia de Avaliação de Desempenho", 
    description: "Como conduzir e participar das avaliações de desempenho",
    type: "avaliacao",
    content: `# Guia de Avaliação de Desempenho

## Frequência
- Avaliações semestrais
- Feedback contínuo durante o período

## Critérios de Avaliação
1. **Qualidade do Trabalho**
2. **Pontualidade e Assiduidade**
3. **Trabalho em Equipe**
4. **Iniciativa e Proatividade**
5. **Desenvolvimento Profissional**

## Como se Preparar
- Revise suas metas
- Documente suas conquistas
- Identifique áreas de melhoria
- Prepare perguntas para seu gestor

## Durante a Avaliação
- Seja honesto e transparente
- Aceite feedback construtivo
- Discuta seus objetivos de carreira
- Defina metas para o próximo período`,
    createdAt: "2024-02-01T09:00:00Z"
  },
  { 
    id: 4, 
    title: "Biblioteca de Conhecimento", 
    description: "Artigos e materiais de leitura para desenvolvimento profissional",
    type: "leitura",
    content: `# Biblioteca de Conhecimento

## Artigos Recomendados

### Liderança
- "Os 7 Hábitos das Pessoas Altamente Eficazes"
- "Como Influenciar Pessoas e Fazer Amigos"
- "Liderança: A Inteligência Emocional"

### Produtividade
- "Técnica Pomodoro: Maximizando o Foco"
- "Getting Things Done (GTD)"
- "Deep Work: Como Ter Foco Profundo"

### Comunicação
- "Comunicação Não-Violenta"
- "O Poder da Escuta Ativa"
- "Apresentações que Inspiram"

## Podcasts Corporativos
- Episódio 1: "Inovação no Ambiente de Trabalho"
- Episódio 2: "Gestão de Tempo e Prioridades"
- Episódio 3: "Construindo Relacionamentos Profissionais"

## Cursos Online Disponíveis
- Excel Avançado
- Inglês para Negócios
- Design Thinking`,
    createdAt: "2024-02-10T16:00:00Z"
  }
];

const materialTypeLabels = {
  avaliacao: "Avaliação",
  leitura: "Leitura", 
  manual: "Manual",
  atendimento: "Atendimento"
};

const materialTypeIcons = {
  avaliacao: FileText,
  leitura: Book,
  manual: Settings,
  atendimento: HelpCircle
};

export function MaterialsPage({ onBack }: MaterialsPageProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  
  const filteredMaterials = selectedType === "all" 
    ? mockMaterials 
    : mockMaterials.filter(material => material.type === selectedType);

  const materialsByType = {
    manual: mockMaterials.filter(m => m.type === 'manual'),
    atendimento: mockMaterials.filter(m => m.type === 'atendimento'),
    avaliacao: mockMaterials.filter(m => m.type === 'avaliacao'),
    leitura: mockMaterials.filter(m => m.type === 'leitura'),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Materiais e Documentos</h1>
          <p className="text-muted-foreground">Acesse manuais, protocolos e materiais de leitura</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos ({mockMaterials.length})</TabsTrigger>
          <TabsTrigger value="manual">Manuais ({materialsByType.manual.length})</TabsTrigger>
          <TabsTrigger value="atendimento">Atendimento ({materialsByType.atendimento.length})</TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliação ({materialsByType.avaliacao.length})</TabsTrigger>
          <TabsTrigger value="leitura">Leitura ({materialsByType.leitura.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <MaterialGrid materials={mockMaterials} />
        </TabsContent>
        
        <TabsContent value="manual" className="space-y-4">
          <MaterialGrid materials={materialsByType.manual} />
        </TabsContent>
        
        <TabsContent value="atendimento" className="space-y-4">
          <MaterialGrid materials={materialsByType.atendimento} />
        </TabsContent>
        
        <TabsContent value="avaliacao" className="space-y-4">
          <MaterialGrid materials={materialsByType.avaliacao} />
        </TabsContent>
        
        <TabsContent value="leitura" className="space-y-4">
          <MaterialGrid materials={materialsByType.leitura} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MaterialGrid({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Nenhum material disponível nesta categoria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials.map((material) => {
        const Icon = materialTypeIcons[material.type];
        return (
          <Card key={material.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <Badge variant="outline">
                    {materialTypeLabels[material.type]}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {material.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <div className="flex gap-2">
                  {material.fileUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a 
                        href={material.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Ler
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <DialogTitle>{material.title}</DialogTitle>
                        </div>
                        <DialogDescription>
                          {material.description}
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="h-[60vh] w-full">
                        <div className="prose prose-sm max-w-none p-4">
                          {material.content?.split('\n').map((line, index) => {
                            if (line.startsWith('# ')) {
                              return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
                            }
                            if (line.startsWith('## ')) {
                              return <h2 key={index} className="text-xl font-semibold mt-4 mb-3">{line.slice(3)}</h2>;
                            }
                            if (line.startsWith('### ')) {
                              return <h3 key={index} className="text-lg font-medium mt-3 mb-2">{line.slice(4)}</h3>;
                            }
                            if (line.startsWith('- ')) {
                              return <li key={index} className="ml-4">{line.slice(2)}</li>;
                            }
                            if (line.match(/^\d+\. /)) {
                              return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                            }
                            if (line.trim() === '') {
                              return <br key={index} />;
                            }
                            return <p key={index} className="mb-2">{line}</p>;
                          })}
                        </div>
                        {material.fileUrl && (
                          <div className="border-t p-4">
                            <h5 className="font-medium mb-2">Arquivo PDF</h5>
                            <Button variant="outline" asChild>
                              <a 
                                href={material.fileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Abrir PDF em nova aba
                              </a>
                            </Button>
                          </div>
                        )}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}