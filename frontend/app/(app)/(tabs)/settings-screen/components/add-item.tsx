import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse } from 'date-fns';
import { supabase } from '../../../../supabase';

// Function to parse date strings in dd/MM/yyyy format
const parseDateString = (value: any, originalValue: any) => {
    const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
    return parsedDate;
};

// Validation schema
const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
    expiration_date: Yup.date().transform(parseDateString).required('Expiration date is required').typeError('Invalid date format, use dd/MM/yyyy'),
    purchase_date: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy'),
    mfg: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy'),
});

const AddItem = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching user session:', error);
            } else if (data?.session) {
                setUserId(data.session.user.id);
            }
        };

        fetchUserId();
    }, []);

    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const { data, error } = await supabase
                .from('item')
                .insert([
                    {
                        item_name: values.item_name,
                        item_quantity: values.item_quantity,
                        expiration_date: values.expiration_date ? format(parseDateString(null, values.expiration_date), 'yyyy-MM-dd') : null,
                        purchase_date: values.purchase_date ? format(parseDateString(null, values.purchase_date), 'yyyy-MM-dd') : null,
                        mfg: values.mfg ? format(parseDateString(null, values.mfg), 'yyyy-MM-dd') : null,
                        user_id: userId
                    },
                ]);

            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Item added successfully');
            resetForm(); // Reset the form after successful submission
        } catch (error: any) {
            console.error('Error adding item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View className="flex flex-1 bg-stone-950 p-4">
            <Text className="text-white mb-4">Add Item Page</Text>
            <Formik
                initialValues={{
                    ingredient_id: '',
                    inventory_id: '',
                    shopping_list_id: '',
                    item_quantity: '',
                    expiration_date: '',
                    purchase_date: '',
                    mfg: '',
                    item_name: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                        {touched.ingredient_id && errors.ingredient_id && <Text className="text-red-500">{errors.ingredient_id}</Text>}

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
                            placeholder="Expiration Date dd/mm/yy"
                            onChangeText={handleChange('expiration_date')}
                            onBlur={handleBlur('expiration_date')}
                            value={values.expiration_date}
                        />
                        {touched.expiration_date && errors.expiration_date && <Text className="text-red-500">{errors.expiration_date}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="Purchase Date dd/mm/yy"
                            onChangeText={handleChange('purchase_date')}
                            onBlur={handleBlur('purchase_date')}
                            value={values.purchase_date}
                        />
                        {touched.purchase_date && errors.purchase_date && <Text className="text-red-500">{errors.purchase_date}</Text>}

                        <TextInput
                            className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                            placeholder="MFG dd/mm/yy"
                            onChangeText={handleChange('mfg')}
                            onBlur={handleBlur('mfg')}
                            value={values.mfg}
                        />
                        {touched.mfg && errors.mfg && <Text className="text-red-500">{errors.mfg}</Text>}

                        <Button title="Submit" onPress={handleSubmit as any} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default AddItem;