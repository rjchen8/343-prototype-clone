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
});

export default styles;
