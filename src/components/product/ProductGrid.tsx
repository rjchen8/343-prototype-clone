import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { ProductCard, Product } from './ProductCard';
import { theme } from '../../theme';

interface ProductGridProps {
    products: Product[];
    cart: Record<string, { quantity: number }>;
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (productId: string) => void;
}

/**
 * Grid layout for displaying products
 */
export function ProductGrid({ products, cart, onAddToCart, onRemoveFromCart }: ProductGridProps) {
    return (
        <View style={styles.container}>
            <Text variant="h2" style={styles.title}>Catalog</Text>
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
