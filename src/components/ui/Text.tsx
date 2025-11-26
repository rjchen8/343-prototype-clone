import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'label';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse';

interface CustomTextProps extends TextProps {
    variant?: TextVariant;
    color?: TextColor;
    bold?: boolean;
    semibold?: boolean;
    medium?: boolean;
}

/**
 * Themed Text component with predefined variants
 */
export function Text({
    variant = 'body',
    color = 'primary',
    bold,
    semibold,
    medium,
    style,
    ...props
}: CustomTextProps) {
    const variantStyle = styles[variant];
    const colorStyle = { color: theme.colors.text[color] };

    const fontWeightStyle = bold
        ? { fontWeight: theme.typography.fontWeight.bold }
        : semibold
            ? { fontWeight: theme.typography.fontWeight.semibold }
            : medium
                ? { fontWeight: theme.typography.fontWeight.medium }
                : {};

    return (
        <RNText
            style={[variantStyle, colorStyle, fontWeightStyle, style]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: theme.typography.fontSize['3xl'],
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.fontSize['3xl'] * theme.typography.lineHeight.tight,
    },
    h2: {
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.fontSize['2xl'] * theme.typography.lineHeight.tight,
    },
    h3: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
    },
    body: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    },
    bodySmall: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    },
    caption: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
    },
    label: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    },
});
