import { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductGrid } from '../../components/product/ProductGrid';
import { CartSummary, CartItem } from '../../components/cart/CartSummary';
import { Product } from '../../components/product/ProductCard';
import { AddProductModal } from '../../components/product/AddProductModal';
import { theme } from '../../theme';

// Initial product data
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Product 1', price: 10.99, image: 'https://placehold.co/125/png', stock: 10, description: "placeholder" },
  { id: '2', name: 'Product 2', price: 15.99, image: 'https://placehold.co/125/png', stock: 5, description: "placeholder" },
  { id: '3', name: 'Product 3', price: 8.99, image: 'https://placehold.co/125/png', stock: 15, description: "placeholder" },
  { id: '4', name: 'Product 4', price: 12.99, image: 'https://placehold.co/125/png', stock: 3, description: "placeholder" },
  { id: '5', name: 'Product 5', price: 20.99, image: 'https://placehold.co/125/png', stock: 8, description: "placeholder" },
  { id: '6', name: 'Product 6', price: 18.99, image: 'https://placehold.co/125/png', stock: 12, description: "placeholder" },
  { id: '7', name: 'Product 7', price: 25.99, image: 'https://placehold.co/125/png', stock: 2, description: "placeholder" },
  { id: '8', name: 'Product 8', price: 14.99, image: 'https://placehold.co/125/png', stock: 20, description: "placeholder" },
];

export function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

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

  const handleAddProduct = (productData: Omit<Product, 'id' | 'image'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
      image: 'https://placehold.co/125/png', // Default placeholder image
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const cartItems = Object.values(cart);

  return (
    <View style={styles.container}>
      <ProductGrid
        products={filteredProducts}
        cart={cart}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddProductPress={() => setIsModalVisible(true)}
      />
      <CartSummary items={cartItems} />

      <AddProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddProduct}
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
  },
});