import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Product, ProductCategory, categoryLabels, categoryIcons } from '@/types/product';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, ScanBarcode, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: Omit<Product, 'id' | 'createdAt'>) => void;
}

export const AddProductModal = ({ open, onOpenChange, onAdd }: AddProductModalProps) => {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState<ProductCategory>('other');
  const [dateOpen, setDateOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, insira o nome do produto.',
        variant: 'destructive',
      });
      return;
    }

    if (!expirationDate) {
      toast({
        title: 'Data obrigatória',
        description: 'Por favor, selecione a data de validade.',
        variant: 'destructive',
      });
      return;
    }

    onAdd({
      name: name.trim(),
      expirationDate,
      quantity,
      category,
    });

    // Reset form
    setName('');
    setExpirationDate(undefined);
    setQuantity(1);
    setCategory('other');
    onOpenChange(false);

    toast({
      title: 'Produto adicionado',
      description: `${name} foi adicionado com sucesso.`,
    });
  };

  const handleScanBarcode = () => {
    toast({
      title: 'Leitor de código de barras',
      description: 'Funcionalidade em desenvolvimento.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold text-center">
            Adicionar Produto
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome do Produto
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Adicione o nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pr-12 h-12 rounded-xl"
              />
              <button
                type="button"
                onClick={handleScanBarcode}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ScanBarcode className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Data de Validade</Label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full h-12 rounded-xl justify-start text-left font-normal',
                    !expirationDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                  {expirationDate ? (
                    format(expirationDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={expirationDate}
                  onSelect={(date) => {
                    setExpirationDate(date);
                    setDateOpen(false);
                  }}
                  initialFocus
                  className="pointer-events-auto"
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Quantidade</Label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5 text-foreground" />
              </button>
              <span className="text-2xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Categoria</Label>
            <Select value={category} onValueChange={(value: ProductCategory) => setCategory(value)}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {(Object.keys(categoryLabels) as ProductCategory[]).map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-lg">
                    <span className="flex items-center gap-2">
                      <span>{categoryIcons[cat]}</span>
                      <span>{categoryLabels[cat]}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};