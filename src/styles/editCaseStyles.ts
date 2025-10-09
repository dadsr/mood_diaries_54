import { StyleSheet } from 'react-native';
import {EdgeInsets} from "react-native-safe-area-context";

export const createEditCaseStyles = (isRTL:boolean,insets:EdgeInsets) => StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: isRTL ? "row-reverse" : "row",
            paddingHorizontal: 25,
            paddingTop: insets.top
        },
        scrollView: {
            borderColor: '#000020'
        },
        heading:{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: isRTL ? 'right' : 'left',
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 16,
            marginBottom: 8,
            color: '#333',
            textAlign: isRTL ? 'right' : 'left',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: '#fff',
            marginBottom: 8,
            textAlign: isRTL ? 'right' : 'left',
        },
        textarea: {
            minHeight: 100,
            textAlignVertical: 'top',
        },
        error: {
            color: '#ff4444',
            fontSize: 14,
            marginBottom: 8,
            marginTop: 4
        },
        dateText: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: '#fff',
            marginBottom: 8,
            color: '#333',
            textAlign: isRTL ? 'right' : 'left',
        },
        submitButton: {
            backgroundColor: '#007AFF',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 32,
        },
        submitButtonDisabled: {
            backgroundColor: '#ccc'
        },
        submitButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
        },
        emotionsTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 16,
            marginBottom: 8,
            color: '#333'
        },
        modalContainer: {
            flex: 1,
            backgroundColor: '#fff',

        },
        modalHeader: {
            flexDirection: isRTL ? "row-reverse" : "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            backgroundColor:'rgba(76,114,229,0.61)',
        },
        modalTitle: {
            fontSize: 22,
            padding: 5,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        exitButton: {
            fontSize: 24,
            color: '#666',
            paddingHorizontal: 10
        },
        footerContainer: {
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#eee',
            backgroundColor: '#fff',
        },
        footerButton: {
            backgroundColor: '#007AFF',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center'
        },
        footerButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold'
        },
    });
