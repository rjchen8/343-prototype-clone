import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../theme';

interface SearchBarProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

/**
 * Themed search bar component
 */
export function SearchBar({ value, onChangeText, placeholder = 'Search...', ...props }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.text.tertiary}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.base,
    },
    input: {
        height: 44,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.base,
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.primary,
    },
});
