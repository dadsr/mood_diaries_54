import React, {JSX, useState} from 'react';
import {I18nManager, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DistortionThought} from '../models/DistortionThought';
import {DistortionsThoughtKey} from "../models/consts/DistortionsThoughtsConst";
import {COLORS} from "@/src/styles/themConstants";
import {globalStyles} from "@/src/styles/globalStyles";

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

            <View style={styles.container}>

                <View style={styles.heading}>
                    <Text style={styles.headingText}>{t("case.dis")}:</Text>
                </View>

                <View style={styles.modalContent}>
                    {distortionThoughts.map((distortionThought, index) => {
                        const distortionKey: DistortionsThoughtKey | null = distortionThought.getDistortion;
                        if (!distortionKey) {
                            return null;
                        }
                        const displayName: string = t(`distortions.${distortionKey}`, {defaultValue: distortionKey});
                        const description: string = t(`distortions.${distortionKey}_description`, {defaultValue: 'No description available.'});

                        return (
                            <View key={index} style={styles.itemContainer}>
                                <Text style={styles.displayName}>{displayName}</Text>
                                <Text style={styles.description}>{description}</Text>
                            </View>
                        );
                    })}

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={closeModel}>
                        <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
                textAlign: I18nManager.isRTL ? 'right' : 'left',
            },

            heading: {
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            },
            headingText:{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
            },
            modalContent:{
                padding: 10,
                backgroundColor: COLORS.background,
                borderWidth: 2,
                borderColor:'black',
            },
            buttonContainer: {
                alignItems: 'center',
            },
            noEmotionsContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            },
            noEmotionsText: {
                fontSize: 18,
                lineHeight: 28,
                textAlign: 'center',
                color: '#666',
            },

            itemContainer: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
        },
        displayName: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 4,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
        },
        description: {
            color: '#666',
            fontSize: 14,
            lineHeight: 20,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
        },
    });
