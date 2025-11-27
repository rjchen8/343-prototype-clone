import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text } from '../ui';
import { theme } from '../../theme';

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    description: string;
    unitType: 'unit' | 'weight_g' | 'weight_kg'; // 'unit' for discrete items, 'weight_g' for grams, 'weight_kg' for kilograms
};

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onInfo?: () => void;
    onQuantityChange?: (quantity: number) => void;
}

/**
 * Product card component displaying product info and quantity controls
 */
export function ProductCard({ product, quantity, onAdd, onRemove, onInfo, onQuantityChange }: ProductCardProps) {
    const isOutOfStock = quantity >= product.stock;
    const [quantityText, setQuantityText] = React.useState(quantity.toString());

    // Update text when quantity prop changes
    React.useEffect(() => {
        setQuantityText(quantity.toString());
    }, [quantity]);

    const handleQuantityChange = (text: string) => {
        setQuantityText(text);
    };

    const handleQuantityBlur = () => {
        const parsedQuantity = parseFloat(quantityText);

        // Validate the input
        if (isNaN(parsedQuantity) || parsedQuantity < 0) {
            // Reset to current quantity if invalid
            setQuantityText(quantity.toString());
            return;
        }

        // For unit-based products, round to nearest integer
        const finalQuantity = product.unitType === 'unit'
            ? Math.round(parsedQuantity)
            : parsedQuantity;

        // Don't exceed stock
        const clampedQuantity = Math.min(finalQuantity, product.stock);

        if (onQuantityChange && clampedQuantity !== quantity) {
            onQuantityChange(clampedQuantity);
        }

        setQuantityText(clampedQuantity.toString());
    };

    // Helper to get unit suffix
    const getUnitSuffix = () => {
        if (product.unitType === 'weight_g') return ' g';
        if (product.unitType === 'weight_kg') return ' kg';
        return '';
    };

    // Helper to get price suffix
    const getPriceSuffix = () => {
        if (product.unitType === 'weight_g') return '/g';
        if (product.unitType === 'weight_kg') return '/kg';
        return '';
    };

    return (
        <View style={styles.card}>
            {/* Info button in top-left corner */}
            {onInfo && (
                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={onInfo}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('../../assets/icons8-info-24.png')}
                        style={styles.infoIcon}
                    />
                </TouchableOpacity>
            )}

            {/* Stock badge in top-right corner */}
            <View style={styles.stockBadge}>
                <Text variant="caption" color="secondary" semibold>
                    Stock: {product.stock}{getUnitSuffix()}
                </Text>
            </View>

            <Image source={{ uri: product.image }} style={styles.image} />
            <Text variant="bodySmall" semibold numberOfLines={1}>
                {product.name}
            </Text>
            <Text variant="bodySmall" color="secondary" style={styles.price}>
                ${product.price.toFixed(2)}{getPriceSuffix()}
            </Text>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={[
                        styles.controlButton,
                        styles.removeButton,
                        quantity === 0 && styles.removeButtonDisabled
                    ]}
                    onPress={onRemove}
                    disabled={quantity === 0}
                >
                    <Text style={styles.removeButtonText} bold>-</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.quantityInput}
                    value={quantityText}
                    onChangeText={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    keyboardType="decimal-pad"
                    selectTextOnFocus
                />

                <TouchableOpacity
                    style={[
                        styles.controlButton,
                        isOutOfStock && styles.controlButtonDisabled
                    ]}
                    onPress={onAdd}
                    disabled={isOutOfStock}
                >
                    <Text color="inverse" bold>+</Text>
                </TouchableOpacity>
            </View>

            {isOutOfStock && quantity > 0 && (
                <Text variant="caption" color="tertiary" style={styles.outOfStockText}>
                    Max stock reached
                </Text>
            )}
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
        position: 'relative',
    },
    stockBadge: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: theme.spacing.xs,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: 2,
        borderRadius: theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        zIndex: 1,
    },
    infoButton: {
        position: 'absolute',
        top: theme.spacing.xs,
        left: theme.spacing.xs,
        backgroundColor: theme.colors.background,
        padding: 2,
        borderRadius: theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        zIndex: 1,
    },
    infoIcon: {
        width: 20,
        height: 20,
        tintColor: theme.colors.primary,
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
    removeButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    removeButtonText: {
        color: theme.colors.text.secondary,
    },
    removeButtonDisabled: {
        borderColor: theme.colors.border,
        opacity: 0.5,
    },
    controlButtonDisabled: {
        backgroundColor: theme.colors.text.tertiary,
        opacity: 0.5,
    },
    quantityInput: {
        minWidth: 40,
        height: 32,
        textAlign: 'center',
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.semibold,
        color: theme.colors.text.primary,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.xs,
    },
    outOfStockText: {
        marginTop: theme.spacing.xs,
    },
});
