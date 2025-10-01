import React from 'react';
import { Button, View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import exportServices from '../services/ExportServices';

type ExportButtonProps = {
    diary: number;
};

const ExportButton: React.FC<ExportButtonProps> = ({ diary }) => {
    console.log("ExportButton");
    const { t } = useTranslation();

    const handleExport = async () => {
        try {
            await exportServices.exportAndShare(diary, t);
        } catch (error: any) {
            Alert.alert(
                t('exportDiary.exportError'),
                error?.message ?? 'Unknown error'
            );
        }
    };

    return (
        <View>
            <Button title={t('exportDiary.share')} onPress={handleExport} />
        </View>
    );
};

export default ExportButton;
