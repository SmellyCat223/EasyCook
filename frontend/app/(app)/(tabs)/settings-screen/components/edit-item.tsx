import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse, isSameDay, isBefore, isValid } from 'date-fns';
import { supabase } from '../../../../supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';

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
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
    expiration_date: Yup.date().transform(parseDateString).required('Expiration date is required').typeError('Invalid date format, use dd/MM/yyyy'),
    purchase_date: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Purchase date must be today or in the past', isPastOrToday),
    mfg: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Manufacturing date must be today or in the past', isPastOrToday),
});

const EditItem = () => {
    const [initialValues, setInitialValues] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { itemId } = useLocalSearchParams();

    console.log("ItemId:", itemId);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                if (!itemId) {
                    console.error("No itemId found");
                    setLoading(false);
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
                    setLoading(false);
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
                setLoading(false);
            } catch (error) {
                console.error("Unexpected error fetching item details:", error);
                setLoading(false);
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
            router.back();
        } catch (error: any) {
            console.error('Error updating item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    if (loading) {
        return (
            <View className="flex flex-1 bg-stone-950 p-4 justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
                <Text className="text-white mt-4">Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex flex-1 bg-stone-950 p-4">
            <Text className="text-white mb-4">Edit Item Page</Text>
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
                    <View className="space-y-2">
                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="Item Name"
                            onChangeText={handleChange('item_name')}
                            onBlur={handleBlur('item_name')}
                            value={values.item_name}
                        />
                        {touched.item_name && errors.item_name && <Text className="text-red-500">{errors.item_name}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="Item Quantity"
                            onChangeText={handleChange('item_quantity')}
                            onBlur={handleBlur('item_quantity')}
                            value={values.item_quantity}
                            keyboardType="numeric"
                        />
                        {touched.item_quantity && errors.item_quantity && <Text className="text-red-500">{errors.item_quantity}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="Expiration Date dd/MM/yyyy"
                            onChangeText={handleChange('expiration_date')}
                            onBlur={handleBlur('expiration_date')}
                            value={values.expiration_date}
                        />
                        {touched.expiration_date && errors.expiration_date && <Text className="text-red-500">{errors.expiration_date}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="Purchase Date dd/MM/yyyy"
                            onChangeText={handleChange('purchase_date')}
                            onBlur={handleBlur('purchase_date')}
                            value={values.purchase_date}
                        />
                        {touched.purchase_date && errors.purchase_date && <Text className="text-red-500">{errors.purchase_date}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="MFG dd/MM/yyyy"
                            onChangeText={handleChange('mfg')}
                            onBlur={handleBlur('mfg')}
                            value={values.mfg}
                        />
                        {touched.mfg && errors.mfg && <Text className="text-red-500">{errors.mfg}</Text>}

                        <Button title="Update Item" onPress={handleSubmit as any} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default EditItem;
