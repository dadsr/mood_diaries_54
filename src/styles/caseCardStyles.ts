import {StyleSheet} from "react-native";
import {COLORS, THEME_CONSTANTS} from "@/src/styles/themConstants";

export const CreateCaseCardStyles = (isRTL:boolean) => StyleSheet.create({
    card: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 12,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: COLORS.black,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitleContainer: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    cardTitleContent: {
        alignItems: 'center',
    },
    cardTitleText: {
        fontSize: 20,
        fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
        textAlign: isRTL ? 'right' : 'left',
    },
    cardSubtitleText: {
        fontSize: 12,
        opacity: 0.8,
        textAlign:'center',
    },
    text: {
        fontSize: 16,
        fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.REGULAR ,
        marginBottom: 8,
        color: '#333',
        textAlign: isRTL ? 'right' : 'left',
    },
    label:{
        fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
        fontSize:18,
        textAlign: isRTL ? 'right' : 'left',
    },
    linkText: {
        fontSize: 16,
        fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
        color: COLORS.black,
        textAlign: 'center',
    },
    actionsButtonsContainer: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    actionButtonWrap: {
        width: '48%',
    },
    actionsButton: {
        borderRadius: 12,
        paddingVertical: 6,
        backgroundColor: COLORS.primary,
    },
});
