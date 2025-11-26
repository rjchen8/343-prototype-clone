import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { theme } from '../../theme';

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
}

/**
 * Product card component displaying product info and quantity controls
 */
export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text variant="bodySmall" semibold numberOfLines={1}>
                {product.name}
            </Text>
            <Text variant="bodySmall" color="secondary" style={styles.price}>
                ${product.price.toFixed(2)}
            </Text>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={onRemove}
                >
                    <Text color="inverse" bold>-</Text>
                </TouchableOpacity>

                <Text variant="body" semibold style={styles.quantity}>
                    {quantity}
                </Text>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={onAdd}
                >
                    <Text color="inverse" bold>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: theme.spacing.xs / 2,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        alignItems: 'center',
        minWidth: 120,
        ...theme.shadows.sm,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.base,
        marginBottom: theme.spacing.sm,
    },
    price: {
        marginBottom: theme.spacing.sm,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    controlButton: {
        width: 32,
        height: 32,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        minWidth: 24,
        textAlign: 'center',
    },
});
