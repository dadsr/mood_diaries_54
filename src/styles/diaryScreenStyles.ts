import {StyleSheet} from "react-native";

export const createDiaryScreenStyles = (isRTL:boolean) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: isRTL ? "right" : "left",
        writingDirection: isRTL ? 'rtl' : 'ltr',
    },

    noEventsContainer: {
        alignItems: isRTL ? "flex-end" : "flex-start",
        padding: 20,
    },
    noEventsTextHeader: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 20,
        textAlign: isRTL ? "right" : "left",
        writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    noEventsText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        textAlign: isRTL ? "right" : "left",
        writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    scrollView: {
        borderColor: '#000020',
        writingDirection: isRTL ? 'rtl' : 'ltr',
    },
});
