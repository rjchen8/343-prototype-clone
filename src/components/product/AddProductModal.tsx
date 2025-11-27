import { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, Button, Input } from '../ui';
import { theme } from '../../theme';
import { Product } from './ProductCard';

interface AddProductModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (product: Omit<Product, 'id'>) => void;
}

/**
 * Modal for adding new products with two-column layout
 */
export function AddProductModal({ visible, onClose, onAdd }: AddProductModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);

    const handleSubmit = () => {
        // Validate inputs
        if (!name.trim()) {
            alert('Please enter a product name');
            return;
        }

        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            alert('Please enter a valid price');
            return;
        }

        const stockNum = parseInt(stock, 10);
        if (isNaN(stockNum) || stockNum < 0) {
            alert('Please enter a valid stock amount');
            return;
        }

        if (!photo) {
            alert('Please add a photo');
            return;
        }

        // Add the product
        onAdd({
            name: name.trim(),
            price: priceNum,
            stock: stockNum,
            description: description.trim() || 'No description provided',
            image: photo,
        });

        // Reset form
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setStock('');
        setDescription('');
        setPhoto(null);
    };

    const handlePickPhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setPhoto(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text variant="h2">Add new product</Text>
                        <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                            <Text variant="h3" color="secondary">✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Scrollable Two Column Content */}
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.content}>
                            {/* Left Column - Photo and Description */}
                            <View style={styles.leftColumn}>
                                <TouchableOpacity 
                                    style={styles.photoTile} 
                                    activeOpacity={0.7}
                                    onPress={handlePickPhoto}
                                >
                                    {photo ? (
                                        <Image source={{ uri: photo }} style={styles.photoImage} />
                                    ) : (
                                        <>
                                            <View style={styles.photoIconContainer}>
                                                <Text style={styles.photoIcon}>+</Text>
                                            </View>
                                            <Text variant="bodySmall" color="secondary" style={styles.photoText}>
                                                Add photo of item
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>

                                {/* Description Field */}
                                <View style={styles.fieldContainer}>
                                    <Text variant="label" style={styles.label}>
                                        Description <Text variant="caption" color="tertiary">(optional)</Text>
                                    </Text>
                                    <Input
                                        value={description}
                                        onChangeText={setDescription}
                                        placeholder="Enter product description"
                                    />
                                </View>
                            </View>

                            {/* Right Column - Name, Price, Stock */}
                            <View style={styles.rightColumn}>
                                {/* Name Field */}
                                <View style={styles.fieldContainer}>
                                    <Text variant="label" style={styles.label}>Product name</Text>
                                    <Input
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Enter product name"
                                    />
                                </View>

                                {/* Price Field */}
                                <View style={styles.fieldContainer}>
                                    <Text variant="label" style={styles.label}>Price</Text>
                                    <Input
                                        value={price}
                                        onChangeText={setPrice}
                                        placeholder="0.00"
                                        keyboardType="decimal-pad"
                                    />
                                </View>

                                {/* Stock Field */}
                                <View style={styles.fieldContainer}>
                                    <Text variant="label" style={styles.label}>Stock quantity</Text>
                                    <Input
                                        value={stock}
                                        onChangeText={setStock}
                                        placeholder="0"
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Fixed Footer with Action Buttons */}
                    <View style={styles.footer}>
                        <Button
                            variant="outline"
                            onPress={handleCancel}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onPress={handleSubmit}
                            style={styles.addButton}
                        >
                            Add product
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.lg,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    closeButton: {
        padding: theme.spacing.xs,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.xl,
    },
    content: {
        flexDirection: 'row',
        gap: theme.spacing.xl,
        alignItems: 'flex-start',
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
    },
    photoTile: {
        height: 162.5,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        overflow: 'hidden',
    },
    photoImage: {
        width: '100%',
        height: '100%',
        borderRadius: theme.borderRadius.base,
    },
    photoIconContainer: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    photoIcon: {
        fontSize: 48,
        lineHeight: 48,
        color: theme.colors.text.inverse,
        fontWeight: theme.typography.fontWeight.bold,
    },
    photoText: {
        textAlign: 'center',
    },
    fieldContainer: {
        marginBottom: theme.spacing.md,
    },
    label: {
        marginBottom: theme.spacing.xs,
        color: theme.colors.text.primary,
    },
    footer: {
        flexDirection: 'row',
        padding: theme.spacing.xl,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    cancelButton: {
        flex: 1,
        borderColor: theme.colors.error,
    },
    addButton: {
        flex: 2,
    },
});
