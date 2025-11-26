import { View, StyleSheet } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { Text } from './Text';
import { theme } from '../../theme';

export interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    label: string;
    value: string;
    options: DropdownOption[];
    onValueChange: (value: string) => void;
}

/**
 * Dropdown component using react-native-element-dropdown
 */
export function Dropdown({ label, value, options, onValueChange }: DropdownProps) {
    return (
        <View style={styles.container}>
            <Text variant="bodySmall" semibold style={styles.label}>
                {label}
            </Text>

            <RNDropdown
                data={options}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => onValueChange(item.value)}
                placeholder="Select..."
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.itemTextStyle}
                activeColor={theme.colors.surface}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.base,
    },
    label: {
        marginBottom: theme.spacing.xs,
        color: theme.colors.text.secondary,
    },
    dropdown: {
        height: 44,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.base,
    },
    placeholderStyle: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.tertiary,
    },
    selectedTextStyle: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.primary,
    },
    dropdownContainer: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    itemTextStyle: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.primary,
    },
});
