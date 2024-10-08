import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse } from 'date-fns';
import { supabase } from '../app/supabase';
import { Icon } from 'react-native-elements';

const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').min(0, 'Cannot be negative').integer('Must be an integer'),
});

interface EditItemProps {
    itemId: string | null;
    onClose: () => void;
}

const EditItemGrocery: React.FC<EditItemProps> = ({ itemId, onClose }) => {

    const [initialValues, setInitialValues] = useState<any | null>(null);

    // console.log("ItemId:", itemId);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                if (!itemId) {
                    console.error("No itemId found");
                    return; // Ensure itemId is available
                }

                console.log("Fetching item details for itemId:", itemId);

                const { data: itemData, error: itemError } = await supabase
                    .from('item')
                    .select('*')
                    .eq('item_id', itemId)
                    .single();

                if (itemError) {
                    console.error('Error fetching item details:', itemError);
                    return;
                }

                console.log("ItemData:", itemData);

                if (itemData) {
                    setInitialValues({
                        item_name: itemData.item_name,
                        item_quantity: itemData.item_quantity.toString(),
                        measurement_unit: itemData.measurement_unit,
                        expiration_date: itemData.expiration_date ? format(parse(itemData.expiration_date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '',
                        purchase_date: itemData.purchase_date ? format(parse(itemData.purchase_date, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '',
                        mfg: itemData.mfg ? format(parse(itemData.mfg, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '',
                    });
                }
            } catch (error) {
                console.error("Unexpected error fetching item details:", error);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const { data, error } = await supabase
                .from('item')
                .update({
                    item_name: values.item_name,
                    item_quantity: values.item_quantity,
                })
                .eq('item_id', itemId);

            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Item updated successfully');
            resetForm();
            onClose();
        } catch (error: any) {
            console.error('Error updating item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from('item')
                .delete()
                .eq('item_id', itemId);

            if (error) {
                throw error;
            }

            Alert.alert('Success', 'Item deleted successfully');
            onClose();
        } catch (error: any) {
            console.error('Error deleting item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Formik
            initialValues={initialValues || {
                item_name: '',
                item_quantity: '',
                measurement_unit: '',
                expiration_date: '',
                purchase_date: '',
                mfg: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="relative">
                    <TouchableOpacity
                        className="absolute top-0 right-0 rounded-full bg-zinc-500 p-1.5 z-20"
                        onPress={onClose}
                    >
                        <Icon name="close" size={16} color="#f4f4f5" />
                    </TouchableOpacity>
                    <View className="space-y-2 border-b border-zinc-500/30 py-4 z-10">
                        <Text className="text-zinc-100 text-xl text-center pb-4">Edit item</Text>

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">Name: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="Item Name"
                                onChangeText={handleChange('item_name')}
                                onBlur={handleBlur('item_name')}
                                value={values.item_name}
                            />
                        </View>

                        {touched.item_name && errors.item_name && <Text className="text-red-500 text-center pb-2">   {errors.item_name}</Text>}

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">Quantity: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="Item Quantity (g)"
                                onChangeText={handleChange('item_quantity')}
                                onBlur={handleBlur('item_quantity')}
                                value={values.item_quantity}
                                keyboardType="numeric"
                            />
                        </View>

                        {touched.item_quantity && errors.item_quantity && <Text className="text-red-500 text-center pb-2">       {errors.item_quantity}</Text>}

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">Unit: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="Measurement Unit"
                                onChangeText={handleChange('measurement_unit')}
                                onBlur={handleBlur('imeasurement_unit')}
                                value={values.measurement_unit}
                            />
                        </View>
                        {touched.measurement_unit && errors.measurement_unit && <Text className="text-red-500 text-center pb-2">      {errors.measurement_unit}</Text>}

                    </View>
                    <View className="flex flex-row justify-around pt-2">
                        <Button title="Delete" color="red" onPress={handleDelete as any} />
                        <Button title="Update" onPress={handleSubmit as any} />

                    </View>
                </View>
            )}
        </Formik>
    );
};

export default EditItemGrocery;
