import {StyleSheet} from "react-native";

export const createMultiSelectCheckBoxesStyles = (isRTL:boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    row: {
        alignItems: 'flex-start',
        flexDirection: isRTL ? "row-reverse" : "row",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    checkboxContainer: {
        marginLeft: isRTL ? 12 : 0,
        marginRight:  isRTL ? 0 : 12,
        marginTop: 2
    },
    cell: {
        flex: 1,
        paddingHorizontal: 8
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: isRTL ? "right" : "left",
    },
    description: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
        textAlign: isRTL ? "right" : "left"
    }
});
