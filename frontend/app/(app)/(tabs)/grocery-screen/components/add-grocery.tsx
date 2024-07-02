import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse } from 'date-fns';
import { supabase } from '../../../../supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Function to parse date strings in dd/MM/yyyy format
const parseDateString = (value: any, originalValue: any) => {
    const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
    return parsedDate;
};

// Validation schema
const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
});

const AddGrocery = () => {
    const { shoppingListId } = useLocalSearchParams();
    const { userId } = useLocalSearchParams();
    const router = useRouter();

    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            const { data, error } = await supabase
                .from('item')
                .insert([
                    {
                        item_name: values.item_name,
                        item_quantity: values.item_quantity,
                        user_id: userId,
                        item_shopping_list_id: shoppingListId // Current shopping list
                    },
                ]);

            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Item added successfully');
            resetForm(); // Reset the form after successful submission
            router.back();
        } catch (error: any) {
            console.error('Error adding item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View className="flex flex-1 bg-stone-950 p-4">
            
            <Formik
                initialValues={{
                    item_name: '',
                    item_quantity: '',
                    expiration_date: '',
                    purchase_date: '',
                    mfg: '',
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

                        <Button title="Submit" onPress={handleSubmit as any} />
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default AddGrocery;
