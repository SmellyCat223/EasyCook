import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../../../../supabase';

// Validation schema
const validationSchema = Yup.object().shape({
    // ingredient_id: Yup.number().required('Ingredient ID is required').positive('Must be a positive number').integer('Must be an integer'),
    // inventory_id: Yup.number().required('Inventory ID is required').positive('Must be a positive number').integer('Must be an integer'),
    // shopping_list_id: Yup.number().positive('Must be a positive number').integer('Must be an integer').nullable(),
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
    expiration_date: Yup.date(),
    purchase_date: Yup.date().nullable(),
    mfg: Yup.date().nullable(),
});

const AddItem = () => {
    const handleSubmit = async (values: any) => {
        try {
            const { data, error } = await supabase
                .from('item')
                .insert([
                    {
                        // ingredient_id: values.ingredient_id,
                        // inventory_id: values.inventory_id,
                        // shopping_list_id: values.shopping_list_id,
                        item_quantity: values.item_quantity,
                        expiration_date: values.expiration_date,
                        purchase_date: values.purchase_date,
                        mfg: values.mfg,
                    },
                ]);

            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Item added successfully');
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
