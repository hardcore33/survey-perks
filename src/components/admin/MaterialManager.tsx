import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, FileText, Book, Settings, HelpCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Material } from "@/types/admin";
import { supabase } from "@/lib/supabase";

interface MaterialManagerProps {
  materials: Material[];
  onMaterialsChange: (materials: Material[]) => void;
}

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

export function MaterialManager({ materials, onMaterialsChange }: MaterialManagerProps) {
  const { toast } = useToast();
  const [newMaterial, setNewMaterial] = useState<{
    title: string;
    description: string;
    type: Material['type'];
    content: string;
    file?: File;
  }>({
    title: "",
    description: "",
    type: "manual",
    content: ""
  });
  
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    const fileName = `materials/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('materials')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('materials')
      .getPublicUrl(fileName);
      
    return publicUrl;
  };

  const addMaterial = async () => {
    if (!newMaterial.title.trim() || !newMaterial.description.trim()) {
      toast({ 
        title: "Erro", 
        description: "Preencha pelo menos o título e descrição", 
        variant: "destructive" 
      });
      return;
    }

    setIsUploading(true);
    
    try {
      let fileUrl = "";
      
      if (newMaterial.file) {
        fileUrl = await uploadFile(newMaterial.file);
      }

      const material: Material = {
        id: Date.now(),
        title: newMaterial.title,
        description: newMaterial.description,
        type: newMaterial.type,
        content: newMaterial.content,
        fileUrl: fileUrl || undefined,
        createdAt: new Date().toISOString()
      };

      onMaterialsChange([...materials, material]);
      setNewMaterial({ title: "", description: "", type: "manual", content: "" });
      toast({ title: "Sucesso", description: "Material adicionado com sucesso!" });
    } catch (error) {
      toast({ 
        title: "Erro", 
        description: "Erro ao fazer upload do arquivo", 
        variant: "destructive" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeMaterial = (id: number) => {
    onMaterialsChange(materials.filter(m => m.id !== id));
    toast({ title: "Sucesso", description: "Material removido!" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Materiais</CardTitle>
        <CardDescription>
          Adicione materiais de avaliação, leitura, manuais e atendimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="material-title">Título</Label>
              <Input
                id="material-title"
                placeholder="Nome do material..."
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="material-type">Tipo</Label>
              <Select 
                value={newMaterial.type} 
                onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value as Material['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="avaliacao">Avaliação</SelectItem>
                  <SelectItem value="leitura">Leitura</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="atendimento">Atendimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="material-description">Descrição</Label>
            <Textarea
              id="material-description"
              placeholder="Descrição do material..."
              value={newMaterial.description}
              onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="material-content">Conteúdo</Label>
            <Textarea
              id="material-content"
              placeholder="Conteúdo do material ou instruções..."
              className="min-h-[100px]"
              value={newMaterial.content}
              onChange={(e) => setNewMaterial({ ...newMaterial, content: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="material-file">Arquivo PDF (opcional)</Label>
            <Input
              id="material-file"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setNewMaterial({ ...newMaterial, file });
              }}
            />
            {newMaterial.file && (
              <p className="text-sm text-muted-foreground">
                Arquivo selecionado: {newMaterial.file.name}
              </p>
            )}
          </div>
          
          <Button onClick={addMaterial} disabled={isUploading}>
            {isUploading ? (
              <Upload className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {isUploading ? "Enviando..." : "Adicionar Material"}
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Materiais Existentes ({materials.length})</h4>
          {materials.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum material cadastrado ainda
            </p>
          ) : (
            <div className="grid gap-3">
              {materials.map((material) => {
                const Icon = materialTypeIcons[material.type];
                return (
                  <div key={material.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <h5 className="font-medium">{material.title}</h5>
                        <Badge variant="outline">
                          {materialTypeLabels[material.type]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                      {material.content && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {material.content}
                        </p>
                      )}
                      {material.fileUrl && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          <a 
                            href={material.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Ver arquivo PDF
                          </a>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Criado em: {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMaterial(material.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}