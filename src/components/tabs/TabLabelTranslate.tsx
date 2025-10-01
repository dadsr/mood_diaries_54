import React, { JSX } from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

interface TabLabelProps {
    labelKey: string;
    color: string;
    focused: boolean;
}

export default function TabLabelTranslate({ labelKey, color, focused }: TabLabelProps): JSX.Element {
    console.log("TabLabelTranslate");

    const { t } = useTranslation();

    return (
        <Text style={{ color, fontSize: 10, fontWeight: focused ? "bold" : "normal" }}>
            {t(labelKey)}
        </Text>
    );
}
