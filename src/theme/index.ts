/**
 * Centralized theme configuration
 * Provides consistent colors, typography, spacing, and other design tokens
 */

export const theme = {
    colors: {
        // Primary colors
        primary: '#007AFF',
        primaryDark: '#0051D5',
        primaryLight: '#4DA2FF',

        // Neutral colors
        background: '#FFFFFF',
        surface: '#F5F5F5',
        border: '#DDDDDD',
        borderLight: '#EEEEEE',

        // Text colors
        text: {
            primary: '#000000',
            secondary: '#666666',
            tertiary: '#999999',
            inverse: '#FFFFFF',
        },

        // Semantic colors
        success: '#34C759',
        warning: '#FF9500',
        error: '#FF3B30',
        info: '#5AC8FA',
    },

    typography: {
        // Font sizes
        fontSize: {
            xs: 12,
            sm: 14,
            base: 16,
            lg: 18,
            xl: 20,
            '2xl': 24,
            '3xl': 30,
            '4xl': 36,
        },

        // Font weights
        fontWeight: {
            normal: '400' as const,
            medium: '500' as const,
            semibold: '600' as const,
            bold: '700' as const,
        },

        // Line heights
        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.75,
        },
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        base: 16,
        lg: 20,
        xl: 24,
        '2xl': 32,
        '3xl': 48,
    },

    borderRadius: {
        sm: 4,
        base: 8,
        lg: 12,
        xl: 16,
        full: 9999,
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        base: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
    },
} as const;

export type Theme = typeof theme;
