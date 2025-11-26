import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../ui';
import { theme } from '../../theme';

interface AddProductCardProps {
    onPress: () => void;
}

/**
 * Card component that triggers the add product modal
 */
export function AddProductCard({ onPress }: AddProductCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
                <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text variant="bodySmall" semibold style={styles.text}>
                Add product
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: theme.spacing.xs / 2,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
        minHeight: 200,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    plusIcon: {
        fontSize: 36,
        lineHeight: 36,
        color: theme.colors.text.inverse,
        fontWeight: theme.typography.fontWeight.bold,
    },
    text: {
        color: theme.colors.text.secondary,
    },
});
