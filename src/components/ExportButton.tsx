import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import exportServices from '../services/ExportServices';
import {globalStyles} from "@/src/styles/globalStyles";
import CustomToast from "@/src/components/CustomToast";

type ExportButtonProps = {
    diary: number;
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
};

const ExportButton: React.FC<ExportButtonProps> = ({ diary,showSuccess,showError }:ExportButtonProps) => {
    console.log("ExportButton");
    const { t } = useTranslation();

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');


    const handleExport =  () => {
        exportServices.exportAndShare(diary, t)
            .then(()=>
                showSuccess(t('exportDiary.exportSuccess'))
            ).catch(() => {
            showError(t('exportDiary.exportError'));
        })
    };

    return (
        <View>
            <Button
                onPress={handleExport}
                style={globalStyles.button}
                labelStyle={globalStyles.buttonText}
            >
                {t('exportDiary.share')}
            </Button>
        </View>
    );
};

export default ExportButton;
