import React from "react";
import { ImageBackground, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Text } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { globalStyles, ltr, nbsp } from "@/src/styles/globalStyles";
import { aboutImg } from "../../assets";
import { useLanguage } from "@/src/hooks/LanguageContext";

export default function About() {
    console.log("About");

    const { t } = useTranslation();
    const { isRTL } = useLanguage();

    const phoneNumberRaw = '+972-52-841-4130';
    const phoneNumber = ltr(phoneNumberRaw);
    const email = 'yael.chapal@gmail.com';
    const IG_HANDLE = 'yaelchapal';
    const instagram = `https://www.instagram.com/${IG_HANDLE}/`;

    const handlePhonePress = () => Linking.openURL(`tel:${phoneNumber}`);
    const handleEmailPress = () => Linking.openURL(`mailto:${email}`);
    const handleInstagramPress = () => Linking.openURL(instagram);

    return (
        <ImageBackground
            source={aboutImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={[styles.container]}>
                <View style={styles.contentContainer}>
                    <Text style={[styles.heading, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {t('about.infoHeading')}
                    </Text>
                    <Text style={[styles.bodyText, { textAlign: isRTL ? 'right' : 'left' }]}>
                        {t('about.infoText')}
                    </Text>
                    <Divider style={{ marginVertical: 20 }} />

                    <TouchableOpacity
                        style={[styles.contactItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                        onPress={handlePhonePress}
                    >
                        <Text style={styles.contactLabel}>{t("about.phoneNumber")}{':' + nbsp}</Text>
                        <Text style={styles.contactValue}>{phoneNumber}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.contactItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                        onPress={handleEmailPress}
                    >
                        <Text style={styles.contactLabel}>{t("about.email")}{':' + nbsp}</Text>
                        <Text style={styles.contactValue}>{email}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.contactItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                        onPress={handleInstagramPress}
                    >
                        <Text style={styles.contactLabel}>{t("about.instagram")}{':' + nbsp}</Text>
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
        backgroundColor: 'rgba(217,230,223,0.55)',
        borderRadius: 8,
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 12,
        color: '#000',
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    bodyText: {
        fontSize: 19,
        lineHeight: 26,
        color: 'black',
    },
    contactItem: {
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
    },
});
