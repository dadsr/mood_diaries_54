import React, {JSX, useState} from 'react';
import {I18nManager, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView as DefaultScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DistortionThought} from '../models/DistortionThought';
import {DistortionsThoughtKey} from "../models/consts/DistortionsThoughtsConst";
import {COLORS} from "@/src/styles/themConstants";
import {globalStyles} from "@/src/styles/globalStyles";
import {backgroundImg} from "@/assets";

interface DistortionsProps {
    distortionThoughts: DistortionThought[];
    onPress: () => void;
}

export default function DistortionThoughtsModel({ distortionThoughts,onPress }: DistortionsProps):JSX.Element {
    console.log("DistortionThoughtsModel");
    const {t} = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(true);
    const closeModel = () => {
        setIsModalVisible(false);
        onPress();
        console.log("closeModel");
    };


    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onPress}
        >
            <ImageBackground
                source={backgroundImg}
                style={globalStyles.background}
                resizeMode="stretch"
            >
                <View style={styles.container}>

                    <View style={styles.heading}>
                        <Text style={styles.headingText}>{t("case.distortionThoughts")}:</Text>
                    </View>

                    {distortionThoughts.length === 0 ? (
                        <View style={[styles.modalContent,styles.noDistortionsContent]}>

                            <Text style={styles.noDistortionsText}>
                                {t("distortionThoughtsModel.no distortionThoughts text")}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.modalContent}>

                            <DefaultScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 16, }}>
                                {distortionThoughts.map((distotrionThought, index) => {
                                    const distortionKey = distotrionThought.getDistortion;
                                    if (!distortionKey) {
                                        return null;
                                    }
                                    const displayName = t(`distortions.${distortionKey}`, { defaultValue: distortionKey });
                                    const description = t(`distortions.${distortionKey}_description`, { defaultValue: 'No description available.' });
                                    return (
                                        <View key={index} style={styles.itemContainer}>
                                            <Text style={styles.displayName}>{displayName}</Text>
                                            <Text style={styles.description}>{description}</Text>
                                        </View>
                                    );
                                })}
                            </DefaultScrollView>
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={closeModel}>
                        <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Modal>
    );

}








const styles = StyleSheet.create({

    container:{
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'right',
    },

    heading: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row-reverse',
        padding: 5,
    },

    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'right',
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
        textAlign: I18nManager.isRTL ? 'right' : 'right',
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
        textAlign: I18nManager.isRTL ? 'right' : 'right',
    },

    description: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'right',
    },
});
