import {I18nManager, StyleSheet} from 'react-native';
import {COLORS} from "./themConstants";

// Helpers for BiDi-safe rendering
export const ltr = (s: string) => `\u202A${s}\u202C`; // force LTR for the wrapped string
export const nbsp = '\u00A0'; // non‑breaking space


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
    },
    icon: {
        position: 'absolute',
        start: 10,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.secondary,
        marginVertical: 10,
    },

    imageBackground:{
        flex: 1,
        width: '100%',
        height: '100%',
    },

    /***********************
     * Settings
     * ********************/
    settingsContainer:{
        flex: 1,
        padding: 30,
        paddingTop: 50,
        alignItems: "center"
    },
    languageSwitchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.accent,
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    languageLabel:{
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        minWidth: 60,
    },
    languageSwitch:{
        marginHorizontal: 15,
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },


    /***********************
     * Global
     * *********************/

    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },


    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    textarea:{
        minHeight: 100,
        textAlignVertical: 'top',

    },


    /** Button styles */

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    button: {
        backgroundColor: COLORS.secondary,
        margin: 10,
        padding: 10,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
    },

    buttonText: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: COLORS.white,
        fontWeight: '600',
    },

    /** Radio styles */

    selectionSection: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },


    /** Switch styles */

    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 5,
    },

    /** SnackBar styles */

    snackbar: {
        backgroundColor:COLORS.background,
    },
    snackbarText: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 16,
    },



    modelOpener: {
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 6,

    },

    XXX:{

    }
});
