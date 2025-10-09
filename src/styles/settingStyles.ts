import {StyleSheet} from "react-native";

export const createSettingsStyles = (isRTL:boolean) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '50%',
    },
    scrollView: {
        borderColor: '#000020',
        writingDirection: isRTL ? 'rtl' : 'ltr',
        padding: 16,
    },

    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 25,
        marginBottom: 22,
        color: '#222',
        textAlign: "center",
    },
    section: {
        marginBottom: 32,
        borderWidth:2,
        borderColor: 'rgba(34,34,34,0.2)',
        borderRadius: 15,
        padding:20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#444',
        textAlign: "center",
    },
    radioRow: {
        marginBottom: 3,
        flexDirection: isRTL ? "row-reverse" : "row",
    },
    radioLabel: {
        fontSize: 16,
        color: '#222',
        marginHorizontal: 5,
    },
});
