import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, Plus, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'dashboard' | 'products' | 'settings';
  onTabChange: (tab: 'dashboard' | 'products' | 'settings') => void;
  onAddClick: () => void;
}

export const BottomNavigation = ({ activeTab, onTabChange, onAddClick }: BottomNavigationProps) => {
  const navItems = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Início' },
    { id: 'products' as const, icon: Package, label: 'Produtos' },
    { id: 'settings' as const, icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around px-4 py-2 relative">
        {navItems.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {index === 1 && (
              <button
                onClick={onAddClick}
                className="absolute left-1/2 -translate-x-1/2 -top-16 w-14 h-14 rounded-full bg-primary shadow-ios flex items-center justify-center transform hover:scale-105 transition-transform"
              >
                <Plus className="w-7 h-7 text-primary-foreground" />
              </button>
            )}
            <button
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors',
                activeTab === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
};
