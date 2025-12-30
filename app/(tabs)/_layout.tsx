import { Tabs } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import TabLabelTranslate from "../../src/components/tabs/TabLabelTranslate";
import { useLanguage } from "@/src/hooks/LanguageContext";

export default function TabLayout() {
    console.log("TabLayout");

    const { isRTL } = useLanguage();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    textAlign: isRTL ? 'right' : 'left',
                    writingDirection: isRTL ? 'rtl' : 'ltr',
                },
                tabBarIconStyle: {
                    marginLeft: isRTL ? 8 : 0,
                    marginRight: isRTL ? 0 : 8,
                }
            }}
        >
            <Tabs.Screen
                name="firstDiary"
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <TabLabelTranslate color={color} focused={focused} labelKey="navigation.firstDiary" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="view-list" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="secondDiary"
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <TabLabelTranslate color={color} focused={focused} labelKey="navigation.secondDiary" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="view-list" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <TabLabelTranslate color={color} focused={focused} labelKey="navigation.settings" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <TabLabelTranslate color={color} focused={focused} labelKey="navigation.about" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="info" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
