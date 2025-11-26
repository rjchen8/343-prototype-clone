import { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductGrid } from '../../components/product/ProductGrid';
import { CartSummary, CartItem } from '../../components/cart/CartSummary';
import { Product } from '../../components/product/ProductCard';
import { theme } from '../../theme';

// Sample product data
const PRODUCTS: Product[] = [
  { id: '1', name: 'Product 1', price: 10.99, image: 'https://via.placeholder.com/150', stock: 10 },
  { id: '2', name: 'Product 2', price: 15.99, image: 'https://via.placeholder.com/150', stock: 5 },
  { id: '3', name: 'Product 3', price: 8.99, image: 'https://via.placeholder.com/150', stock: 15 },
  { id: '4', name: 'Product 4', price: 12.99, image: 'https://via.placeholder.com/150', stock: 3 },
  { id: '5', name: 'Product 5', price: 20.99, image: 'https://via.placeholder.com/150', stock: 8 },
  { id: '6', name: 'Product 6', price: 18.99, image: 'https://via.placeholder.com/150', stock: 12 },
  { id: '7', name: 'Product 7', price: 25.99, image: 'https://via.placeholder.com/150', stock: 2 },
  { id: '8', name: 'Product 8', price: 14.99, image: 'https://via.placeholder.com/150', stock: 20 },
  { id: '9', name: 'Product 9', price: 14.99, image: 'https://via.placeholder.com/150', stock: 7 },
];

export function Home() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return PRODUCTS;
    }
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
      />
      <CartSummary items={cartItems} />
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