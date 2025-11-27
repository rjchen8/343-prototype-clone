import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: theme.spacing.base,
        gap: theme.spacing.base,
        marginTop: theme.spacing.md,
    },
    controlsSection: {
        flex: 1,
        maxWidth: 300,
    },
    chartSection: {
        flex: 3,
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.border,
        paddingLeft: theme.spacing.base,
    },
    title: {
        padding: theme.spacing.base,
        marginBottom: theme.spacing.xl,
    },
    chartPlaceholder: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.base,
    },
    // Date Picker Styles
    datePickerContainer: {
        marginBottom: theme.spacing.md,
    },
    datePickerLabel: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
        fontWeight: '500',
    },
    dateButton: {
        height: 44,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: theme.spacing.base,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: theme.typography.fontSize.base,
        color: theme.colors.text.primary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        padding: theme.spacing.lg,
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalTitle: {
        marginBottom: theme.spacing.lg,
        textAlign: 'center',
    },
    doneButton: {
        marginTop: theme.spacing.lg,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.base,
        paddingHorizontal: theme.spacing.xl,
        borderRadius: theme.borderRadius.base,
        width: '100%',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontSize: theme.typography.fontSize.base,
        fontWeight: '600',
    },
});

export default styles;
