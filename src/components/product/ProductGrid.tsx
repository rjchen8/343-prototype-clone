import { View, FlatList, StyleSheet } from 'react-native';
import { Text, SearchBar } from '../ui';
import { ProductCard, Product } from './ProductCard';
import { AddProductCard } from './AddProductCard';
import { theme } from '../../theme';

interface ProductGridProps {
    products: Product[];
    cart: Record<string, { quantity: number }>;
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (productId: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onAddProductPress: () => void;
}

/**
 * Grid layout for displaying products with search functionality
 */
export function ProductGrid({
    products,
    cart,
    onAddToCart,
    onRemoveFromCart,
    searchQuery,
    onSearchChange,
    onAddProductPress,
}: ProductGridProps) {
    return (
        <View style={styles.container}>
            <Text variant="h2" style={styles.title}>Catalog</Text>
            <SearchBar
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholder="Search products..."
            />
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={3}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        quantity={cart[item.id]?.quantity || 0}
                        onAdd={() => onAddToCart(item)}
                        onRemove={() => onRemoveFromCart(item.id)}
                    />
                )}
                ListFooterComponent={
                    <AddProductCard onPress={onAddProductPress} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    title: {
        marginBottom: theme.spacing.base,
    },
    grid: {
        gap: theme.spacing.md,
    },
});
