import { ThoughtItem } from "../models/Types";
import { JSX, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { useTranslation } from "react-i18next";

interface CheckboxesProps {
    options: ThoughtItem[];
    headerText: string;
    initialSelected?: string[];
    onSelectionChange?: (selected: string[]) => void;
    isRTL: boolean;
}

export default function MultiSelectCheckboxes({
                                                  options,
                                                  headerText,
                                                  initialSelected = [],
                                                  onSelectionChange,
                                                  isRTL
                                              }: CheckboxesProps): JSX.Element {
    console.log("MultiSelectCheckboxes");
    const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));
    const { t } = useTranslation();

    const toggleSelect = (id: string) => {
        setSelected(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            if (onSelectionChange) {
                onSelectionChange(Array.from(newSet));
            }
            return newSet;
        });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        header: {
            backgroundColor: '#f0f0f0',
            borderBottomWidth: 2,
            paddingHorizontal: 16,
            paddingVertical: 12
        },
        headerText: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
        },
        row: {
            alignItems: 'flex-start',
            flexDirection: isRTL ? "row-reverse" : "row",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: '#eee'
        },
        checkboxContainer: {
            marginLeft: isRTL ? 12 : 0,
            marginRight:  isRTL ? 0 : 12,
            marginTop: 2
        },
        cell: {
            flex: 1,
            paddingHorizontal: 8
        },
        displayName: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 4,
            textAlign: isRTL ? "right" : "left",
        },
        description: {
            color: '#666',
            fontSize: 14,
            lineHeight: 20,
            textAlign: isRTL ? "right" : "left"
        }
    });

    const renderItem = ({ item }: { item: ThoughtItem }) => (
        <TouchableOpacity
            onPress={() => toggleSelect(item.id)}
            style={[
                styles.row,
            ]}
        >
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={selected.has(item.id) ? 'checked' : 'unchecked'}
                    onPress={() => toggleSelect(item.id)}
                />
            </View>
            <View style={styles.cell}>
                <Text style={styles.displayName}>
                    {t(`distortions.${item.name}`) || item.name || 'Missing translation'}
                </Text>
                <Text style={styles.description}>
                    {t(`distortions.${item.name}_description`) || 'Missing description'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* You can render the headerText as needed */}
            <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </View>
    );
}


