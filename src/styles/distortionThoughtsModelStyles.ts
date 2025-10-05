import {StyleSheet} from "react-native";

export const createDistortionThoughtsModelStyles = (isRTL:boolean) => StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
        textAlign: isRTL ? 'right' : 'right',
    },

    heading: {
        flexDirection: isRTL ? 'row-reverse' : 'row-reverse',
        padding: 5,
    },

    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: isRTL ? 'right' : 'right',
    },

    modalContent:{
        flex: 1,
        padding: 10,
        marginBottom: 30,
    },
    noDistortionsContent:{
        backgroundColor: 'rgba(171,179,210,0.56)',
        borderWidth:2,
        borderColor: 'black',
        borderRadius: 11,
        marginBottom: 80,

    },

    scrollView: {
        borderColor: '#000020',
    },

    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 16,
        alignItems: 'center',
    },

    noDistortionsText: {
        fontSize: 30,
        lineHeight: 28,
        padding: 5,
        textAlign: isRTL ? 'right' : 'right',
        color: '#060000',
    },

    itemContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius:5,
        elevation: 3,
        shadowColor: 'rgba(0,0,0,0.61)',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 16,
    },

    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: isRTL ? 'right' : 'right',
    },

    description: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
        textAlign: isRTL ? 'right' : 'right',
    },
});
