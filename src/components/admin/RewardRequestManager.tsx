import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";
import { RewardRequest } from "@/types/admin";
import { toast } from "sonner";

interface RewardRequestManagerProps {
  requests: RewardRequest[];
  onRequestsChange: (requests: RewardRequest[]) => void;
}

export function RewardRequestManager({ requests, onRequestsChange }: RewardRequestManagerProps) {
  const handleApprove = (requestId: number) => {
    const updatedRequests = requests.map(request =>
      request.id === requestId
        ? { ...request, status: 'approved' as const, processedAt: new Date().toISOString() }
        : request
    );
    onRequestsChange(updatedRequests);
    toast.success("Solicitação aprovada!");
  };

  const handleReject = (requestId: number) => {
    const updatedRequests = requests.map(request =>
      request.id === requestId
        ? { ...request, status: 'rejected' as const, processedAt: new Date().toISOString() }
        : request
    );
    onRequestsChange(updatedRequests);
    toast.success("Solicitação rejeitada!");
  };

  const getStatusBadge = (status: RewardRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check className="h-3 w-3 mr-1" />Aprovada</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="h-3 w-3 mr-1" />Rejeitada</Badge>;
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Solicitações Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            Solicitações Pendentes
            {pendingRequests.length > 0 && (
              <Badge variant="secondary">{pendingRequests.length}</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Solicitações de recompensas aguardando aprovação
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhuma solicitação pendente
            </p>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium">{request.userName}</p>
                      <Badge variant="outline">{request.rewardPoints} pontos</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{request.userEmail}</p>
                    <p className="text-sm font-medium text-primary">{request.rewardTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Solicitado em {new Date(request.requestedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Solicitações</CardTitle>
          <CardDescription>
            Solicitações já processadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {processedRequests.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Nenhuma solicitação processada
            </p>
          ) : (
            <div className="space-y-3">
              {processedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{request.userName}</p>
                      <Badge variant="outline">{request.rewardPoints} pontos</Badge>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{request.rewardTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Processado em {request.processedAt ? new Date(request.processedAt).toLocaleDateString('pt-BR') : '-'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}