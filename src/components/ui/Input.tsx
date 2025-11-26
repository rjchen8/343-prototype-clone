import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

/**
 * Themed text input component for forms
 */
export function Input({ value, onChangeText, placeholder, ...props }: InputProps) {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text.tertiary}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 44,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.base,
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
});
