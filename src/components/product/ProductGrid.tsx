import { View, FlatList, StyleSheet } from 'react-native';
import { Text, SearchBar, Dropdown, DropdownOption } from '../ui';
import { ProductCard, Product } from './ProductCard';
import { AddProductCard } from './AddProductCard';
import { theme } from '../../theme';

interface ProductGridProps {
    products: Product[];
    cart: Record<string, { quantity: number }>;
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (productId: string) => void;
    onSetQuantity: (productId: string, quantity: number) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onAddProductPress: () => void;
    onEditProduct?: (product: Product) => void;
    categories: DropdownOption[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

/**
 * Grid layout for displaying products with search functionality
 */
export function ProductGrid({
    products,
    cart,
    onAddToCart,
    onRemoveFromCart,
    onSetQuantity,
    searchQuery,
    onSearchChange,
    onAddProductPress,
    onEditProduct,
    categories,
    selectedCategory,
    onCategoryChange,
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
                ListHeaderComponent={
                    <View style={styles.filterContainer}>
                        <Dropdown
                            label="Category"
                            value={selectedCategory}
                            options={categories}
                            onValueChange={onCategoryChange}
                        />
                    </View>
                }
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        quantity={cart[item.id]?.quantity || 0}
                        onAdd={() => onAddToCart(item)}
                        onRemove={() => onRemoveFromCart(item.id)}
                        onInfo={onEditProduct ? () => onEditProduct(item) : undefined}
                        onQuantityChange={(quantity) => onSetQuantity(item.id, quantity)}
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
    filterContainer: {
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.xs,
    },
    grid: {
        gap: theme.spacing.md,
    },
});
