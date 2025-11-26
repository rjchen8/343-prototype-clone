import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface CardProps {
    children: React.ReactNode;
    style?: any;
}

/**
 * Card component for consistent container styling
 */
export function Card({ children, style }: CardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        padding: theme.spacing.md,
        ...theme.shadows.sm,
    },
});
