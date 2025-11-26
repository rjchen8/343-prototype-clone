import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { theme } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: string;
    fullWidth?: boolean;
}

/**
 * Themed Button component with multiple variants and sizes
 */
export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    style,
    disabled,
    ...props
}: ButtonProps) {
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    const textColor = variant === 'primary' ? 'inverse' : 'primary';

    return (
        <TouchableOpacity
            style={buttonStyle}
            disabled={disabled}
            activeOpacity={0.7}
            {...props}
        >
            <Text
                color={textColor}
                semibold
                style={styles[`text_${size}`]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: theme.borderRadius.base,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Variants
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.surface,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    size_sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
    },
    size_md: {
        paddingHorizontal: theme.spacing.base,
        paddingVertical: theme.spacing.sm,
        minHeight: 40,
    },
    size_lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
    },

    // Text sizes
    text_sm: {
        fontSize: theme.typography.fontSize.sm,
    },
    text_md: {
        fontSize: theme.typography.fontSize.base,
    },
    text_lg: {
        fontSize: theme.typography.fontSize.lg,
    },

    // States
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
});
