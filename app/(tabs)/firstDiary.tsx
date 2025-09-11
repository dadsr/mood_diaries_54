import {JSX} from "react";
import {View, ImageBackground} from "react-native";
import {backgroundImg} from "../../assets";
import {globalStyles} from "../../src/styles/globalStyles";
import DiaryScreen from "../../src/components/DiaryScreen";




export default function firstDiary(): JSX.Element {
    console.log("firstDiary");
    return (
        <ImageBackground
            source={backgroundImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <View style={globalStyles.container}>
                <DiaryScreen diary={1} />
            </View>
        </ImageBackground>
    );
}
