import React, {JSX} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import { useTranslation } from 'react-i18next';
import { DistortionThought } from '../models/DistortionThought';
import {DistortionsThoughtKey} from "../models/consts/DistortionsThoughtsConst";

interface DistortionsProps {
    distortionThoughts: DistortionThought[];
}

export default function DistortionThoughtCard({ distortionThoughts }: DistortionsProps):JSX.Element {
    const {t} = useTranslation();

    return (
        <View>
            {distortionThoughts.map((distortionThought, index) => {
                const distortionKey: DistortionsThoughtKey|null = distortionThought.getDistortion;
                if (!distortionKey) {
                    return null;
                }
                const displayName: string = t(`distortions.${distortionKey}`, { defaultValue: distortionKey });
                const description: string = t(`distortions.${distortionKey}_description`, { defaultValue: 'No description available.' });

                return (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.displayName}>{displayName}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                );
            })}
        </View>
    )
}

    const styles = StyleSheet.create({
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
