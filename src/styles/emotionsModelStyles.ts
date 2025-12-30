import {StyleSheet} from "react-native";
import {COLORS} from "@/src/styles/themConstants";

export const createEmotionsModelStyles = (isRTL:boolean) => StyleSheet.create({
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
    },
    headingText:{
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: isRTL ? 'right' : 'right',
    },

    modalContent:{
        flex: 1,
        padding: 10,
        marginBottom: 30,
    },
    noEmotionsContent:{
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

    noEmotionsText: {
        fontSize: 30,
        lineHeight: 28,
        padding: 5,
        textAlign: isRTL ? 'right' : 'right',
        color: '#060000',
    },

    sliderContainer: {
        padding: 20,
        marginBottom: 25,
        width: '100%',
        borderWidth: 2,
        borderRadius:25,
        borderColor: COLORS.black,
    },
    sliderLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
        textAlign: isRTL ? 'right' : 'right',
    },
    sliderWithMarkings: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        position: 'relative',
        height: 40,
    },
    markingsContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        height: 1,
    },
    slider: {
        flexDirection: 'row-reverse',
        flex: 1,
        height: 40,
    },

    intensityValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 15,
        minWidth: 45,
        textAlign: isRTL ? 'right' : 'right',
    },

    sliderMark: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        top: -5,
    },
    markLine: {
        width: 1.5,
        height: 10,
        backgroundColor: '#a9a9a9',
        borderRadius: 1,
    }
});
