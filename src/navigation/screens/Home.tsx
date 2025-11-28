import { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductGrid } from '../../components/product/ProductGrid';
import { CartSummary, CartItem } from '../../components/cart/CartSummary';
import { SuccessModal } from '../../components/cart/SuccessModal';
import { Product } from '../../components/product/ProductCard';
import { AddProductModal } from '../../components/product/AddProductModal';
import { EditProductModal } from '../../components/product/EditProductModal';
import { DropdownOption } from '../../components/ui/Dropdown';
import { theme } from '../../theme';

// Initial product data
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Product 1', price: 10.99, image: 'https://placehold.co/125/png', stock: 10, description: "placeholder", unitType: 'unit', category: 'Electronics' },
  { id: '2', name: 'Product 2', price: 15.99, image: 'https://placehold.co/125/png', stock: 5, description: "placeholder", unitType: 'unit', category: 'Electronics' },
  { id: '3', name: 'Product 3', price: 8.99, image: 'https://placehold.co/125/png', stock: 15, description: "placeholder", unitType: 'unit', category: 'Clothing' },
  { id: '4', name: 'Product 4', price: 12.99, image: 'https://placehold.co/125/png', stock: 3, description: "placeholder", unitType: 'weight_kg', category: 'Food' },
  { id: '5', name: 'Product 5', price: 20.99, image: 'https://placehold.co/125/png', stock: 8, description: "placeholder", unitType: 'unit', category: 'Clothing' },
  { id: '6', name: 'Product 6', price: 18.99, image: 'https://placehold.co/125/png', stock: 12, description: "placeholder", unitType: 'weight_kg', category: 'Food' },
  { id: '7', name: 'Product 7', price: 25.99, image: 'https://placehold.co/125/png', stock: 2, description: "placeholder", unitType: 'unit' },
  { id: '8', name: 'Product 8', price: 14.99, image: 'https://placehold.co/125/png', stock: 20, description: "placeholder", unitType: 'unit', category: 'Electronics' },
];

export function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Compute unique categories from products
  const categoryOptions = useMemo(() => {
    const uniqueCategories = new Set(
      products
        .map(p => p.category || 'Uncategorized')
        .filter(c => c !== 'Uncategorized')
    );
    const options: DropdownOption[] = [
      { label: 'All Categories', value: '' },
      { label: 'Uncategorized', value: 'Uncategorized' },
      ...Array.from(uniqueCategories).sort().map(cat => ({
        label: cat,
        value: cat,
      })),
    ];
    return options;
  }, [products]);

  // Get existing categories for modals (all categories except 'All Categories')
  const existingCategories = useMemo(() => {
    const uniqueCategories = new Set(
      products
        .map(p => p.category || 'Uncategorized')
    );
    return Array.from(uniqueCategories).sort();
  }, [products]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => (product.category || 'Uncategorized') === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedCategory, products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev[product.id];
      if (existing) {
        return {
          ...prev,
          [product.id]: { ...existing, quantity: existing.quantity + 1 }
        };
      }
      return {
        ...prev,
        [product.id]: { ...product, quantity: 1 }
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev[productId];
      if (!existing) return prev;

      // If quantity is a float (not an integer), remove the item entirely
      if (existing.quantity % 1 !== 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }

      // For integer quantities, decrement by 1
      if (existing.quantity === 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...prev,
        [productId]: { ...existing, quantity: existing.quantity - 1 }
      };
    });
  };

  const removeItemCompletely = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const setCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove from cart if quantity is 0 or negative
      removeItemCompletely(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Clamp to stock limit
    const clampedQuantity = Math.min(quantity, product.stock);

    setCart(prev => {
      const existing = prev[productId];
      if (existing) {
        return {
          ...prev,
          [productId]: { ...existing, quantity: clampedQuantity }
        };
      }
      return {
        ...prev,
        [productId]: { ...product, quantity: clampedQuantity }
      };
    });
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleUpdateProduct = (productId: string, updates: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, ...updates }
        : product
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    // Remove from products list
    setProducts(prev => prev.filter(product => product.id !== productId));

    // Remove from cart if present
    removeItemCompletely(productId);
  };

  const handleCancel = () => {
    setCart({});
  };

  const handleCheckout = () => {
    // Reduce stock for each item in cart
    setProducts(prev => prev.map(product => {
      const cartItem = cart[product.id];
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.quantity
        };
      }
      return product;
    }));

    // Clear cart
    setCart({});

    // Show success modal
    setIsSuccessModalVisible(true);
  };

  const cartItems = Object.values(cart);

  return (
    <View style={styles.container}>
      <ProductGrid
        products={filteredProducts}
        cart={cart}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onSetQuantity={setCartQuantity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddProductPress={() => setIsModalVisible(true)}
        onEditProduct={handleEditProduct}
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <CartSummary
        items={cartItems}
        onCancel={handleCancel}
        onCheckout={handleCheckout}
        onRemoveItem={removeItemCompletely}
      />

      <AddProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddProduct}
        existingCategories={existingCategories}
      />

      <EditProductModal
        visible={isEditModalVisible}
        product={selectedProduct}
        onClose={() => {
          setIsEditModalVisible(false);
          setSelectedProduct(null);
        }}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        existingCategories={existingCategories}
      />

      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: theme.spacing.base,
    gap: theme.spacing.base,
    marginTop: theme.spacing.md,
  },
});