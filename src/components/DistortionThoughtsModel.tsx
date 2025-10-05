import React, {JSX, useMemo, useState} from 'react';
import {ImageBackground, Modal, ScrollView as DefaultScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DistortionThought} from '../models/DistortionThought';
import {globalStyles} from "@/src/styles/globalStyles";
import {backgroundImg} from "@/assets";
import {createDistortionThoughtsModelStyles} from "@/src/styles/distortionThoughtsModelStyles";

interface DistortionsProps {
    distortionThoughts: DistortionThought[];
    onPress: () => void;
    isRTL: boolean;
}

export default function DistortionThoughtsModel({ distortionThoughts, onPress, isRTL }: DistortionsProps):JSX.Element {
    console.log("DistortionThoughtsModel");
    const {t} = useTranslation();
    const styles = useMemo(() => createDistortionThoughtsModelStyles(isRTL), [isRTL]);
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
