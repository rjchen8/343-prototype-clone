import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        gap: 16,
    },
    productSection: {
        flex: 2,
    },
    cartSection: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
        paddingLeft: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    grid: {
        gap: 12,
    },
    productCard: {
        flex: 1,
        margin: 6,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 120,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    button: {
        width: 32,
        height: 32,
        backgroundColor: '#007AFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '600',
        minWidth: 24,
        textAlign: 'center',
    },
    cartList: {
        flex: 1,
    },
    emptyCart: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cartItemName: {
        flex: 1,
        fontSize: 14,
    },
    cartItemQuantity: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 12,
    },
    cartItemPrice: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 2,
        borderTopColor: '#333',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});

export default styles;