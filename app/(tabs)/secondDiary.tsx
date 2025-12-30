import DiaryScreen from "@/src/components/DiaryScreen";
import { useLanguage } from "@/src/hooks/LanguageContext";
import { globalStyles } from "@/src/styles/globalStyles";
import { JSX } from "react";
import { ImageBackground, View } from "react-native";
import { backgroundImg } from "../../assets";

export default function SecondDiary(): JSX.Element {
    console.log("SecondDiary");
    const { isRTL } = useLanguage();

    return (
        <ImageBackground source={backgroundImg} style={globalStyles.background} resizeMode="stretch">
            <View style={{
                flex: 1,
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: isRTL ? "flex-end" : "flex-start",
                justifyContent: "flex-start",
                paddingStart: 16,
                paddingEnd: 16,
                paddingTop: 20,
            }}>
                <DiaryScreen diary={2} isRTL={isRTL} />
            </View>
        </ImageBackground>
    );
}
