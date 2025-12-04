import { useState } from 'react';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { Dashboard } from '@/components/Dashboard';
import { ProductList } from '@/components/ProductList';
import { Settings } from '@/components/Settings';
import { BottomNavigation } from '@/components/BottomNavigation';
import { AddProductModal } from '@/components/AddProductModal';

const Index = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings'>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleClearData = () => {
    setProducts([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar Spacer */}
      <div className="safe-area-top bg-background" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CV</span>
              </div>
              <span className="font-semibold text-foreground">Controle de Validade</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 pb-28">
        {activeTab === 'dashboard' && (
          <Dashboard products={products} onDeleteProduct={handleDeleteProduct} />
        )}
        {activeTab === 'products' && (
          <ProductList products={products} onDeleteProduct={handleDeleteProduct} />
        )}
        {activeTab === 'settings' && (
          <Settings onClearData={handleClearData} />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      {/* Add Product Modal */}
      <AddProductModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default Index;
