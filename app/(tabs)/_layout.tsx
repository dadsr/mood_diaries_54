import {Tabs} from 'expo-router';
import {MaterialIcons} from "@expo/vector-icons";
import TabLabelTranslate from "../../src/components/tabs/TabLabelTranslate";

export default function TabLayout() {

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="firstDiary"
                options={{
                    tabBarLabel: (props) => (
                        <TabLabelTranslate {...props} labelKey="navigation.firstDiary" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="view-list" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="secondDiary"
                options={{
                    tabBarLabel: (props) => (
                        <TabLabelTranslate {...props} labelKey="navigation.secondDiary" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="view-list" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: (props) => (
                        <TabLabelTranslate {...props} labelKey="navigation.settings" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="about"
                options={{
                    tabBarLabel: (props) => (
                        <TabLabelTranslate {...props} labelKey="navigation.about" />
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="info" size={24} color={color} />
                    ),
                }}
            />


        </Tabs>
    );

}
