import { JSX } from "react";
import { View, ImageBackground } from "react-native";
import { backgroundImg } from "../../assets";
import { globalStyles } from "../../src/styles/globalStyles";
import DiaryScreen from "../../src/components/DiaryScreen";
import { useLanguage } from "../../src/hooks/LanguageContext";

export default function SecondDiary(): JSX.Element {
    console.log("SecondDiary");
    const { isRTL } = useLanguage();


    return (
        <ImageBackground source={backgroundImg} style={globalStyles.background}>
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
