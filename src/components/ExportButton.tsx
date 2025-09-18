import React from "react";
import { Button, View, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import Share from "react-native-share";
import exportServices from "@/src/services/ExportServices";

type ExportButtonProps = {
    diary: number;
};

const ExportButton: React.FC<ExportButtonProps> = ({ diary }) => {
    const { t } = useTranslation();

    // General Share Sheet
    const handleShare = async () => {
        try {
            const csv = await exportServices.exportDiaryToCSV(diary, t);
            const path = await exportServices.saveCSVToFile(csv);

            await Share.open({
                title: t("exportDiary.share"),
                url: "file://" + path,
                type: "text/csv",
                message: t("exportDiary.shareMessage"),
                failOnCancel: false,
            });
        } catch (error) {
            Alert.alert(t("exportDiary.exportError"), error?.toString() ?? "Unknown error");
        }
    };

    // Share via WhatsApp
    const handleShareWhatsApp = async () => {
        try {
            const csv = await exportServices.exportDiaryToCSV(diary, t);
            const path = await exportServices.saveCSVToFile(csv);

            await Share.shareSingle({
                title: t("exportDiary.shareWA"),
                url: "file://" + path,
                type: "text/csv",
                message: t("exportDiary.shareWAmsg"),
                social: Share.Social.WHATSAPP,
                failOnCancel: false,
            });
        } catch (error) {
            Alert.alert(t("exportDiary.exportError"), error?.toString() ?? "Unknown error");
        }
    };

    // Share via Email
    const handleShareEmail = async () => {
        try {
            const csv = await exportServices.exportDiaryToCSV(diary, t);
            const path = await exportServices.saveCSVToFile(csv);

            await Share.shareSingle({
                title: t("exportDiary.shareEmail"),
                url: "file://" + path,
                type: "text/csv",
                message: t("exportDiary.shareEmailMsg"),
                social: Share.Social.EMAIL,
                failOnCancel: false,
            });
        } catch (error) {
            Alert.alert(t("exportDiary.exportError"), error?.toString() ?? "Unknown error");
        }
    };

    return (
        <View>
            <Button title={t("exportDiary.share")} onPress={handleShare} />
            <Button title={t("exportDiary.shareViaWA")} onPress={handleShareWhatsApp} />
            <Button title={t("exportDiary.shareViaEmail")} onPress={handleShareEmail} />
        </View>
    );
};

export default ExportButton;
