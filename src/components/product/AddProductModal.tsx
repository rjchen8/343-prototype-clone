import { useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, Button, Input, Dropdown, DropdownOption } from '../ui';
import { theme } from '../../theme';
import { Product } from './ProductCard';

interface AddProductModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (product: Omit<Product, 'id'>) => void;
    existingCategories?: string[];
}

/**
 * Modal for adding new products with two-column layout
 */
export function AddProductModal({ visible, onClose, onAdd, existingCategories = [] }: AddProductModalProps) {
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

        // Add the product
        const finalCategory = categoryInput.trim() || category || undefined;
        onAdd({
            name: name.trim(),
            price: priceNum,
            stock: stockNum,
            description: description.trim() || 'No description provided',
            image: photo ? photo : 'https://placehold.co/125/png',
            unitType,
            category: finalCategory,
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
        setUnitType('unit');
        setCategory('');
        setCategoryInput('');
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
                        onScrollBeginDrag={() => Keyboard.dismiss()}
                    >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                            onPress={handleSubmit}
                            style={styles.addButton}
                        >
                            Add product
                        </Button>
                    </View>
                </View>
            </View >
        </Modal >
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
