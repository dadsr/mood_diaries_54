import {I18nManager, ImageBackground, Linking, StyleSheet, TouchableOpacity, View} from "react-native";
import {SafeAreaView } from 'react-native-safe-area-context';
import {Divider, Text} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {globalStyles, ltr, nbsp} from "../../src/styles/globalStyles";
import {aboutImg} from "../../assets";




export default function About() {
    const { t } = useTranslation();

    const phoneNumberRaw = '+972-52-841-4130';
    const phoneNumber = ltr(phoneNumberRaw);

    const email = 'yael.chapal@gmail.com';

    const IG_HANDLE = 'yaelchapal';
    const instagram = `https://www.instagram.com/${IG_HANDLE}/`;

    const handlePhonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleInstagramPress = () => {
        Linking.openURL(instagram);
    };


    return (

    <ImageBackground
        source={aboutImg}
        style={globalStyles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.7 }}
    >
        <SafeAreaView style={styles.container}>

            <View style={styles.contentContainer}>
                <Text style={styles.heading}> {t('about.infoHeading')} </Text>

                <Divider style={globalStyles.divider} />

                <View >
                    <Text style={styles.bodyText}> {t('about.infoText')} </Text>
                </View>
            </View>

            <Divider style={globalStyles.divider} />

            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}> {t('about.phoneNumber')}{':'+ nbsp} </Text>
                <TouchableOpacity onPress={handlePhonePress}>
                    <Text style={styles.contactValue} >{phoneNumber}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}> {t('about.email')}{':'+ nbsp} </Text>
                <TouchableOpacity onPress={handleEmailPress}>
                    <Text style={styles.contactValue}>{email}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contactItem}>
                <Text style={styles.contactLabel}> {t('about.instagram')}{':'+ nbsp} </Text>
                <TouchableOpacity onPress={handleInstagramPress}>
                    <Text style={styles.contactValue}>{IG_HANDLE}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    </ImageBackground>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingStart: 16,
        paddingEnd: 16,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: 'rgba(217,230,223,0.55)', // ↑ more opaque for better readability
        borderRadius: 8,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        color: '#000',
        textShadowColor: 'rgba(255, 255, 255, 0.6)', // slight highlight
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    bodyText: {
        fontSize: 19,
        lineHeight: 26,
        color: 'black',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    contactItem: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    contactLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginEnd: 8,
    },
    contactValue: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#0055ff',
        fontWeight: '500',
        textShadowColor: 'rgba(255, 255, 255, 0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    }
});
