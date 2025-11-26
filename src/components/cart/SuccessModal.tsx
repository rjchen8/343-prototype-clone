import { useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../ui';
import { theme } from '../../theme';

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
}

/**
 * Simple success modal for checkout confirmation
 * Auto-dismisses after 1 second or when tapping the overlay
 */
export function SuccessModal({ visible, onClose }: SuccessModalProps) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.content}>
                    <Text variant="h2" style={styles.title}>
                        ✓ Checkout successful!
                    </Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.base,
    },
    content: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
});
