import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../../../supabase';
import { Icon } from 'react-native-elements';

// Validation schema
const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
});

interface AddGroceryProps {
    shoppingListId: string | null;
    userId: string | null;
    onClose: () => void;
}

const AddGrocery: React.FC<AddGroceryProps> = ({ shoppingListId, userId, onClose }) => {

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
            onClose();
        } catch (error: any) {
            console.error('Error adding item:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
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
                <View className="relative">
                    <TouchableOpacity
                        className="absolute top-0 right-0 rounded-full bg-zinc-500 p-1.5 z-20"
                        onPress={onClose}
                    >
                        <Icon name="close" size={16} color="#f4f4f5" />
                    </TouchableOpacity>
                    <View className="space-y-2 border-b border-zinc-500/30 py-4 z-10">
                        <Text className="text-zinc-100 text-xl text-center pb-4">Add grocery item</Text>
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
                        {touched.item_name && errors.item_name && <Text className="text-red-500 text-center pb-2">  {errors.item_name}</Text>}

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
                        {touched.item_quantity && errors.item_quantity && <Text className="text-red-500 text-center pb-2">      {errors.item_quantity}</Text>}

                    </View>
                    <View className="pt-2">
                        <Button title="Submit" color="#3b82f6" onPress={handleSubmit as any} />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default AddGrocery;