import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Optional: Add icons for success/error if you want (use Image or a library)

type CustomToastProps = {
    visible: boolean;
    message: string;
    type?: 'success' | 'error';
    onDismiss: () => void;
};


const CustomToast: React.FC<CustomToastProps> = ({
                                                     visible,
                                                     message,
                                                     type = 'success',
                                                     onDismiss,
                                                 }) => {
    if (!visible) return null;
    return (
        <View style={styles.toastContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={onDismiss}>
                <View
                    style={[
                        styles.toast,
                        type === 'error' ? styles.errorToast : styles.successToast,
                    ]}
                >
                    {/* (icon can be added here) */}
                    <Text style={styles.toastText}>{message}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: '40%',
        left: 24,
        right: 24,
        alignItems: 'center',
        zIndex: 9999,
    },
    toast: {
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        elevation: 8,
        minWidth: 160,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
    },
    successToast: {
        backgroundColor: '#34B233',
    },
    errorToast: {
        backgroundColor: '#E53E3E',
    },
    toastText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
});

export default CustomToast;
