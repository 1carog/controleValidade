import { Bell, Moon, Trash2, Info, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface SettingsProps {
  onClearData: () => void;
}

export const Settings = ({ onClearData }: SettingsProps) => {
  const handleClearData = () => {
    if (confirm('Tem certeza que deseja excluir todos os produtos?')) {
      onClearData();
      toast({
        title: 'Dados excluídos',
        description: 'Todos os produtos foram removidos.',
      });
    }
  };

  const settingsGroups = [
    {
      title: 'Notificações',
      items: [
        {
          icon: Bell,
          label: 'Alertas de vencimento',
          description: 'Receba notificações quando produtos estiverem vencendo',
          type: 'toggle' as const,
          defaultValue: true,
        },
      ],
    },
    {
      title: 'Aparência',
      items: [
        {
          icon: Moon,
          label: 'Modo escuro',
          description: 'Em breve',
          type: 'toggle' as const,
          defaultValue: false,
          disabled: true,
        },
      ],
    },
    {
      title: 'Dados',
      items: [
        {
          icon: Trash2,
          label: 'Limpar todos os dados',
          description: 'Remover todos os produtos cadastrados',
          type: 'action' as const,
          action: handleClearData,
          destructive: true,
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          icon: Info,
          label: 'Versão do aplicativo',
          description: '1.0.0',
          type: 'info' as const,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Personalize o aplicativo
        </p>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
            {group.title}
          </h2>
          <div className="card-ios divide-y divide-border">
            {group.items.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-4 ${
                  item.type === 'action' ? 'cursor-pointer hover:bg-secondary/50 transition-colors' : ''
                }`}
                onClick={item.type === 'action' ? item.action : undefined}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.destructive ? 'bg-status-expired-bg' : 'bg-primary/10'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.destructive ? 'text-status-expired' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    item.destructive ? 'text-status-expired' : 'text-foreground'
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.type === 'toggle' && (
                  <Switch defaultChecked={item.defaultValue} disabled={item.disabled} />
                )}
                {item.type === 'action' && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
