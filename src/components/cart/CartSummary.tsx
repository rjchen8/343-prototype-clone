import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { theme } from '../../theme';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

interface CartSummaryProps {
    items: CartItem[];
}

/**
 * Cart summary component showing cart items and total
 */
export function CartSummary({ items }: CartSummaryProps) {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <View style={styles.container}>
            <Text variant="h2" style={styles.title}>Cart</Text>

            <ScrollView style={styles.itemList}>
                {items.length === 0 ? (
                    <Text variant="body" color="tertiary" style={styles.emptyMessage}>
                        Cart is empty
                    </Text>
                ) : (
                    items.map(item => (
                        <View key={item.id} style={styles.item}>
                            <Text variant="bodySmall" style={styles.itemName}>
                                {item.name}
                            </Text>
                            <Text variant="bodySmall" color="secondary" style={styles.itemQuantity}>
                                x{item.quantity}
                            </Text>
                            <Text variant="bodySmall" semibold>
                                ${(item.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.totalSection}>
                <Text variant="h3">Total:</Text>
                <Text variant="h3" style={styles.totalAmount}>
                    ${total.toFixed(2)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.border,
        paddingLeft: theme.spacing.base,
    },
    title: {
        marginBottom: theme.spacing.base,
    },
    itemList: {
        flex: 1,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: theme.spacing.lg,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderLight,
    },
    itemName: {
        flex: 1,
    },
    itemQuantity: {
        marginHorizontal: theme.spacing.md,
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.base,
        marginTop: theme.spacing.base,
        borderTopWidth: 2,
        borderTopColor: theme.colors.text.primary,
    },
    totalAmount: {
        color: theme.colors.primary,
    },
});
