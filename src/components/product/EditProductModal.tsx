import { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, Button, Input, Dropdown, DropdownOption } from '../ui';
import { theme } from '../../theme';
import { Product } from './ProductCard';

interface EditProductModalProps {
    visible: boolean;
    product: Product | null;
    onClose: () => void;
    onUpdate: (productId: string, updates: Omit<Product, 'id'>) => void;
    onDelete: (productId: string) => void;
    existingCategories?: string[];
}

/**
 * Modal for editing existing products with two-column layout
 */
export function EditProductModal({ visible, product, onClose, onUpdate, onDelete, existingCategories = [] }: EditProductModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [unitType, setUnitType] = useState<'unit' | 'weight_g' | 'weight_kg'>('unit');
    const [category, setCategory] = useState('');
    const [categoryInput, setCategoryInput] = useState('');

    // Build category options from existing categories (include an empty option)
    const categoryOptions = [
        { label: '', value: '' },
        ...existingCategories
            .filter(cat => cat !== 'Uncategorized')
            .sort()
            .map(cat => ({ label: cat, value: cat })),
    ];

    // Update form when product changes
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price.toString());
            setStock(product.stock.toString());
            setDescription(product.description);
            setPhoto(product.image);
            setUnitType(product.unitType);
            setCategory(product.category || '');
            setCategoryInput('');
        }
    }, [product]);

    const handleUpdate = () => {
        if (!product) return;

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

        // Update the product
        const finalCategory = categoryInput.trim() || category || undefined;
        onUpdate(product.id, {
            name: name.trim(),
            price: priceNum,
            stock: stockNum,
            description: description.trim() || 'No description provided',
            image: photo || product.image,
            unitType,
            category: finalCategory,
        });

        onClose();
    };

    const handleDelete = () => {
        if (!product) return;

        // Confirm deletion
        Alert.alert(
            'Delete Product',
            `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        onDelete(product.id);
                        onClose();
                    },
                },
            ]
        );
    };

    const handlePickPhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
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
        onClose();
    };

    if (!product) return null;

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
                        <Text variant="h2">Product details</Text>
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
                        onScrollBeginDrag={() => Keyboard.dismiss()}
                    >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.content}>
                                {/* Left Column - Photo and Description */}
                                <View style={styles.leftColumn}>
                                    <TouchableOpacity
                                        style={styles.updatePhotoButton}
                                        activeOpacity={0.7}
                                        onPress={handlePickPhoto}
                                    >
                                        <Image
                                            source={require('../../assets/icons8-camera-24.png')}
                                            style={styles.cameraIcon}
                                        />
                                        <Text variant="bodySmall" semibold style={styles.updatePhotoText}>
                                            Update photo
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={styles.photoTile}>
                                        <Image
                                            source={{ uri: photo || product.image }}
                                            style={styles.productImage}
                                        />
                                    </View>

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

                                    {/* Category Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text variant="label" style={styles.label}>
                                            Category <Text variant="caption" color="tertiary">(optional)</Text>
                                        </Text>
                                        <Dropdown
                                            label=""
                                            value={category}
                                            options={categoryOptions}
                                            onValueChange={setCategory}
                                        />
                                        <View style={styles.newCategoryContainer}>
                                            <Text variant="bodySmall" color="secondary" style={styles.newCategoryLabel}>
                                                Or create a new category:
                                            </Text>
                                            <Input
                                                value={categoryInput}
                                                onChangeText={setCategoryInput}
                                                placeholder="Enter new category name"
                                            />
                                        </View>
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
                                        <Text variant="label" style={styles.label}>
                                            Price {unitType === 'unit' ? '(/unit)' : unitType === 'weight_g' ? '(/g)' : '(/kg)'}
                                        </Text>
                                        <Input
                                            value={price}
                                            onChangeText={setPrice}
                                            placeholder="0.00"
                                            keyboardType="decimal-pad"
                                        />
                                    </View>

                                    {/* Stock Field */}
                                    <View style={styles.fieldContainer}>
                                        <Text variant="label" style={styles.label}>
                                            Stock quantity {unitType === 'unit' ? '' : unitType === 'weight_g' ? '(g)' : '(kg)'}
                                        </Text>
                                        <Input
                                            value={stock}
                                            onChangeText={setStock}
                                            placeholder="0"
                                            keyboardType="number-pad"
                                        />
                                    </View>

                                    {/* Unit Type Selector */}
                                    <View style={styles.fieldContainer}>
                                        <Text variant="label" style={styles.label}>Unit type</Text>
                                        <View style={styles.unitTypeContainer}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.unitTypeButton,
                                                    unitType === 'unit' && styles.unitTypeButtonActive
                                                ]}
                                                onPress={() => setUnitType('unit')}
                                                activeOpacity={0.7}
                                            >
                                                <Text
                                                    variant="bodySmall"
                                                    semibold
                                                    style={[
                                                        styles.unitTypeButtonText,
                                                        unitType === 'unit' && styles.unitTypeButtonTextActive
                                                    ]}
                                                >
                                                    Unit
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[
                                                    styles.unitTypeButton,
                                                    unitType === 'weight_g' && styles.unitTypeButtonActive
                                                ]}
                                                onPress={() => setUnitType('weight_g')}
                                                activeOpacity={0.7}
                                            >
                                                <Text
                                                    variant="bodySmall"
                                                    semibold
                                                    style={[
                                                        styles.unitTypeButtonText,
                                                        unitType === 'weight_g' && styles.unitTypeButtonTextActive
                                                    ]}
                                                >
                                                    Weight (g)
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[
                                                    styles.unitTypeButton,
                                                    unitType === 'weight_kg' && styles.unitTypeButtonActive
                                                ]}
                                                onPress={() => setUnitType('weight_kg')}
                                                activeOpacity={0.7}
                                            >
                                                <Text
                                                    variant="bodySmall"
                                                    semibold
                                                    style={[
                                                        styles.unitTypeButtonText,
                                                        unitType === 'weight_kg' && styles.unitTypeButtonTextActive
                                                    ]}
                                                >
                                                    Weight (kg)
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Delete Button */}
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={handleDelete}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={require('../../assets/icons8-trash-24.png')}
                                            style={styles.deleteIcon}
                                        />
                                        <Text variant="bodySmall" semibold style={styles.deleteText}>
                                            Delete product
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
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
                            onPress={handleUpdate}
                            style={styles.updateButton}
                        >
                            Update product
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
    updatePhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: theme.borderRadius.base,
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.xs,
    },
    cameraIcon: {
        width: 20,
        height: 20,
        tintColor: theme.colors.primary,
    },
    updatePhotoText: {
        color: theme.colors.primary,
        fontSize: theme.typography.fontSize.sm,
    },
    photoTile: {
        height: 125,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    fieldContainer: {
        marginBottom: theme.spacing.md,
    },
    label: {
        marginBottom: theme.spacing.xs,
        color: theme.colors.text.primary,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.error,
        backgroundColor: 'transparent',
        marginTop: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: theme.colors.error,
    },
    deleteText: {
        color: theme.colors.error,
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
    updateButton: {
        flex: 2,
    },
    unitTypeContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    unitTypeButton: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.base,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unitTypeButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    unitTypeButtonText: {
        color: theme.colors.text.secondary,
    },
    unitTypeButtonTextActive: {
        color: theme.colors.text.inverse,
    },
    newCategoryContainer: {
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    newCategoryLabel: {
        marginBottom: theme.spacing.sm,
    },
});
