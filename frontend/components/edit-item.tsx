import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse, isSameDay, isBefore, isValid } from 'date-fns';
import { supabase } from '../app/supabase';
import { Icon } from 'react-native-elements';

const parseDateString = (value: any, originalValue: any) => {
    const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
    return isValid(parsedDate) ? parsedDate : new Date(NaN);
};

const isPastOrToday = (value: any) => {
    const today = new Date();
    return isBefore(value, today) || isSameDay(value, today);
};

const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').min(0, 'Cannot be negative').integer('Must be an integer'),
    expiration_date: Yup.date().transform(parseDateString).required('Expiration date is required').typeError('Invalid date format, use dd/MM/yyyy'),
    purchase_date: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format').test('is-past-or-today', 'Invalid purchase date', isPastOrToday),
    mfg: Yup.date().transform(parseDateString).typeError('Invalid date format').test('is-past-or-today', 'Invalid manufacturing date', isPastOrToday),
});

interface EditItemProps {
    itemId: string | null;
    onClose: () => void;
}

const EditItem: React.FC<EditItemProps> = ({ itemId, onClose }) => {
    
    const formatDateString = (value: string) => {
        // Add '/' automatically while the user types
        const rawValue = value.replace(/\//g, '');
        if (rawValue.length > 2 && rawValue.length <= 4) {
            return `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
        } else if (rawValue.length > 4) {
            return `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}/${rawValue.slice(4, 8)}`;
        }
        return rawValue;
    };

    const [initialValues, setInitialValues] = useState<any | null>(null);

    console.log("ItemId:", itemId);

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
                    expiration_date: values.expiration_date ? format(parseDateString(null, values.expiration_date), 'yyyy-MM-dd') : null,
                    purchase_date: values.purchase_date ? format(parseDateString(null, values.purchase_date), 'yyyy-MM-dd') : null,
                    mfg: values.mfg ? format(parseDateString(null, values.mfg), 'yyyy-MM-dd') : null,
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
                            />
                        </View>

                        {touched.item_quantity && errors.item_quantity && <Text className="text-red-500 text-center pb-2">       {errors.item_quantity}</Text>}

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">Purchase: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="dd/MM/yyyy"
                                onChangeText={(value) => handleChange('purchase_date')(formatDateString(value))}
                                onBlur={handleBlur('purchase_date')}
                                value={values.purchase_date}
                            />
                        </View>

                        {touched.purchase_date && errors.purchase_date && <Text className="text-red-500 text-center pb-2">  {errors.purchase_date}</Text>}

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">Exp: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="dd/MM/yyyy"
                                onChangeText={(value) => handleChange('expiration_date')(formatDateString(value))}
                                onBlur={handleBlur('expiration_date')}
                                value={values.expiration_date}
                            />
                        </View>

                        {touched.expiration_date && errors.expiration_date && <Text className="text-red-500 text-center pb-2">          {errors.expiration_date}</Text>}

                        <View className="flex flex-row items-center">
                            <Text className="text-zinc-100 justify-center w-1/4">MFG: </Text>
                            <TextInput
                                className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
                                placeholder="dd/MM/yyyy"
                                onChangeText={(value) => handleChange('mfg')(formatDateString(value))}
                                onBlur={handleBlur('mfg')}
                                value={values.mfg}
                            />
                        </View>

                        {touched.mfg && errors.mfg && <Text className="text-red-500 text-center pb-2">          {errors.mfg}</Text>}
                    </View>
                    <View className="flex flex-row justify-around pt-2">
                        <Button title="Update" onPress={handleSubmit as any} />
                        <Button title="Delete" color="red" onPress={handleDelete as any} />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default EditItem;
