import {StyleSheet} from "react-native";
import {COLORS} from "@/src/styles/themConstants";

export const createEmotionsSelectorStyles = (isRTL:boolean) => StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
    },
    scrollView: {
        borderColor: '#000020'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: isRTL ? 'right' : 'left',
    },

    markLine: {
        width: 1,
        height: 6,
        backgroundColor: '#666',
        marginBottom: 2,
    },
    selectorContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor:'rgba(222,211,196,0.28)',
        borderRadius: 15,
    },
    multiSelectPlaceholder: {
        fontSize: 16,
        color: COLORS.text,
        textAlign: isRTL ? 'right' : 'left',
    },
    multiSelectSearch: {
        height: 50,
        fontSize: 16,
        textAlign: isRTL ? 'right' : 'left',
    },
    multiSelectIcon: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
    },
    sliderContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 5,
        backgroundColor: 'rgba(176,253,170,0.42)',
    },
    emotionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: isRTL ? 'right' : 'left',
    },
    sliderWithMarkings: {
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        marginVertical: 10,
    },
    markingsContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        height: 30,
        pointerEvents: 'none',
        flexDirection: isRTL ? 'row-reverse' : 'row',
    },
    slider: {
        width: '100%',
        height: 40,
        transform: isRTL ? [{ scaleX: -1 }] : [],
    },
    sliderMark: {
        position: 'absolute',
        alignItems: 'center',
        // If slider is flipped, flip marks back so they appear normal
        transform: isRTL
            ? [{ translateX: 5 }, { scaleX: -1 }]
            : [{ translateX: -5 }],
    },

    intensityValue: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    }
});
