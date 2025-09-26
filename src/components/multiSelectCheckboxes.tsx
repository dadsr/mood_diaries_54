import { ThoughtItem } from "../models/Types";
import { JSX, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { useTranslation } from "react-i18next";

interface CheckboxesProps {
    options: ThoughtItem[];
    headerText: string;
    initialSelected?: string[] ;
    onSelectionChange?: (selected: string[]) => void;
}

export default function MultiSelectCheckboxes({ options, headerText,  initialSelected = [],
                                                  onSelectionChange  }: CheckboxesProps): JSX.Element {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));

    console.log("MultiSelectCheckboxes options:", options);
    console.log("Options length:", options?.length);

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
        <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.row}>
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

            {/* Table Rows */}
            <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </View>
    );
}


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
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    checkboxContainer: {
        marginRight: 12,
        marginTop: 2
    },
    cell: {
        flex: 1,
        paddingRight: 8
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'right'
    },
    description: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'right'
    }
});
