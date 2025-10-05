import {ThoughtItem} from "../models/Types";
import {JSX, useMemo, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Checkbox} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {createMultiSelectCheckBoxesStyles} from "@/src/styles/multiSelectCheckboxesStyles";

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
    const { t } = useTranslation();
    const styles = useMemo(() => createMultiSelectCheckBoxesStyles(isRTL), [isRTL]);

    const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));

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


