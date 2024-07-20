// import React from 'react';
// import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
// import { Formik, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import { format, parse, isSameDay, isBefore } from 'date-fns';
// import { supabase } from '../app/supabase';
// import { Icon } from 'react-native-elements';

// // Function to parse date strings in dd/MM/yyyy format
// const parseDateString = (value: any, originalValue: any) => {
//     const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
//     return parsedDate;
// };

// // Custom validation method to ensure the date is not in the future
// const isPastOrToday = (value: any) => {
//     const today = new Date();
//     return isBefore(value, today) || isSameDay(value, today);
// };

// // Validation schema
// const validationSchema = Yup.object().shape({
//     item_name: Yup.string().required('Item name is required'),
//     item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
//     expiration_date: Yup.date().transform(parseDateString).required('Expiration date is required').typeError('Invalid date format, use dd/MM/yyyy'),
//     purchase_date: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Invalid purchase date', isPastOrToday),
//     mfg: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Invalid manufacturing date', isPastOrToday),
// });

// interface AddItemProps {
//     inventoryId: string | null;
//     userId: string | null;
//     onClose: () => void;
// }

// const AddItem: React.FC<AddItemProps> = ({ inventoryId, userId, onClose }) => {

//     const formatDateString = (value: string) => {
//         // Add '/' automatically while the user types
//         const rawValue = value.replace(/\//g, '');
//         if (rawValue.length > 2 && rawValue.length <= 4) {
//             return `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`;
//         } else if (rawValue.length > 4) {
//             return `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}/${rawValue.slice(4, 8)}`;
//         }
//         return rawValue;
//     };

//     const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
//         try {
//             const { data, error } = await supabase
//                 .from('item')
//                 .insert([
//                     {
//                         item_name: values.item_name,
//                         item_quantity: values.item_quantity,
//                         expiration_date: values.expiration_date ? format(parseDateString(null, values.expiration_date), 'yyyy-MM-dd') : null,
//                         purchase_date: values.purchase_date ? format(parseDateString(null, values.purchase_date), 'yyyy-MM-dd') : null,
//                         mfg: values.mfg ? format(parseDateString(null, values.mfg), 'yyyy-MM-dd') : null,
//                         user_id: userId,
//                         item_inventory_id: inventoryId // Current inventory
//                     },
//                 ]);

//             if (error) {
//                 throw error;
//             }
//             Alert.alert('Success', 'Item added successfully');
//             resetForm(); // Reset the form after successful submission
//             onClose();
//         } catch (error: any) {
//             console.error('Error adding item:', error.message);
//             Alert.alert('Error', error.message);
//         }
//     };

//     return (
//         <Formik
//             initialValues={{
//                 item_name: '',
//                 item_quantity: '',
//                 expiration_date: '',
//                 purchase_date: '',
//                 mfg: '',
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//         >
//             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                 <View className="pt-2 relative">
//                     <TouchableOpacity
//                         className="absolute top-0 right-0 rounded-full bg-zinc-500 p-1.5 z-20"
//                         onPress={onClose}
//                     >
//                         <Icon name="close" size={16} color="#f4f4f5" />
//                     </TouchableOpacity>
//                     <View className="space-y-2 border-b border-zinc-500/30 py-4 z-10">
//                         <Text className="text-zinc-100 text-xl text-center pb-4">Add item</Text>
//                         <View className="flex flex-row items-center">
//                             <Text className="text-zinc-100 justify-center w-1/4">Name: </Text>
//                             <TextInput
//                                 className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
//                                 placeholder="Item Name"
//                                 onChangeText={handleChange('item_name')}
//                                 onBlur={handleBlur('item_name')}
//                                 value={values.item_name}
//                             />
//                         </View>

//                         {touched.item_name && errors.item_name && <Text className="text-red-500 text-center pb-2">   {errors.item_name}</Text>}

//                         <View className="flex flex-row items-center">
//                             <Text className="text-zinc-100 justify-center w-1/4">Quantity: </Text>
//                             <TextInput
//                                 className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
//                                 placeholder="Item Quantity (g)"
//                                 onChangeText={handleChange('item_quantity')}
//                                 onBlur={handleBlur('item_quantity')}
//                                 value={values.item_quantity}
//                             />
//                         </View>

//                         {touched.item_quantity && errors.item_quantity && <Text className="text-red-500 text-center pb-2">       {errors.item_quantity}</Text>}

//                         <View className="flex flex-row items-center">
//                             <Text className="text-zinc-100 justify-center w-1/4">Purchase: </Text>
//                             <TextInput
//                                 className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
//                                 placeholder="dd/MM/yyyy"
//                                 onChangeText={(value) => handleChange('purchase_date')(formatDateString(value))}
//                                 onBlur={handleBlur('purchase_date')}
//                                 value={values.purchase_date}
//                             />
//                         </View>

//                         {touched.purchase_date && errors.purchase_date && <Text className="text-red-500 text-center pb-2">  {errors.purchase_date}</Text>}

//                         <View className="flex flex-row items-center">
//                             <Text className="text-zinc-100 justify-center w-1/4">Exp: </Text>
//                             <TextInput
//                                 className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
//                                 placeholder="dd/MM/yyyy"
//                                 onChangeText={(value) => handleChange('expiration_date')(formatDateString(value))}
//                                 onBlur={handleBlur('expiration_date')}
//                                 value={values.expiration_date}
//                             />
//                         </View>

//                         {touched.expiration_date && errors.expiration_date && <Text className="text-red-500 text-center pb-2">          {errors.expiration_date}</Text>}

//                         <View className="flex flex-row items-center">
//                             <Text className="text-zinc-100 justify-center w-1/4">MFG: </Text>
//                             <TextInput
//                                 className="flex flex-1 bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 opacity-70"
//                                 placeholder="dd/MM/yyyy"
//                                 onChangeText={(value) => handleChange('mfg')(formatDateString(value))}
//                                 onBlur={handleBlur('mfg')}
//                                 value={values.mfg}
//                             />
//                         </View>

//                         {touched.mfg && errors.mfg && <Text className="text-red-500 text-center pb-2">          {errors.mfg}</Text>}
//                     </View>
//                     <View className="pt-2">
//                         <Button title="Submit" onPress={handleSubmit as any} />
//                     </View>
//                 </View>
//             )}
//         </Formik>
//     );
// };

// export default AddItem;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format, parse, isSameDay, isBefore } from 'date-fns';
import { supabase } from '../app/supabase';
import { Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

// Function to parse date strings in dd/MM/yyyy format
const parseDateString = (value: any, originalValue: any) => {
    const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());
    return parsedDate;
};

// Custom validation method to ensure the date is not in the future
const isPastOrToday = (value: any) => {
    const today = new Date();
    return isBefore(value, today) || isSameDay(value, today);
};

// Validation schema
const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Item name is required'),
    item_quantity: Yup.number().required('Item quantity is required').positive('Must be a positive number').integer('Must be an integer'),
    expiration_date: Yup.date().transform(parseDateString).required('Expiration date is required').typeError('Invalid date format, use dd/MM/yyyy'),
    purchase_date: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Invalid purchase date', isPastOrToday),
    mfg: Yup.date().nullable().transform(parseDateString).typeError('Invalid date format, use dd/MM/yyyy').test('is-past-or-today', 'Invalid manufacturing date', isPastOrToday),
});

interface AddItemProps {
    inventoryId: string | null;
    userId: string | null;
    onClose: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ inventoryId, userId, onClose }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [scannedData, setScannedData] = useState<any>(null);

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
                        user_id: userId,
                        item_inventory_id: inventoryId // Current inventory
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

    const handleBarCodeScan = (data: any) => {
        setScannedData(data);
        setIsCameraOpen(false);
        // Use the scanned data to populate form fields or process further
        console.log('Scanned Data:', data);
        // Example: set item_name, expiration_date, etc. based on scanned data
        // Example: values.item_name = data.itemName; values.expiration_date = data.expirationDate;
    };

    const renderCamera = () => {
        return (
            <View className="flex flex-1">
                <RNCamera
                    className="flex flex-1"
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                    onBarCodeRead={(event) => handleBarCodeScan(event.data)}
                >
                    <TouchableOpacity
                        onPress={() => setIsCameraOpen(false)}
                        className="bg-blue-500 rounded-lg p-2 absolute top-4 left-4"
                    >
                        <Text className="text-white">Close Camera</Text>
                    </TouchableOpacity>
                </RNCamera>
            </View>
        );
    };

    const renderAddItemForm = () => {
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
                    <View className="pt-2 relative">
                        <TouchableOpacity
                            className="absolute top-0 right-0 rounded-full bg-zinc-500 p-1.5 z-20"
                            onPress={onClose}
                        >
                            <Icon name="close" size={16} color="#f4f4f5" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => setIsCameraOpen(true)}
                            className="bg-blue-500 rounded-lg p-2 absolute top-4 right-4 z-20"
                        >
                            <Text className="text-white">Open Camera</Text>
                        </TouchableOpacity> */}
                        <View className="space-y-2 border-b border-zinc-500/30 py-4 z-10">
                            <Text className="text-zinc-100 text-xl text-center pb-4">Add item</Text>
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
                        <View className="pt-2">
                            <Button title="Submit" onPress={handleSubmit as any} />
                        </View>
                    </View>
                )}
            </Formik>
        );
    };

    return (
        <View className="relative">
            {isCameraOpen ? renderCamera() : renderAddItemForm()}
        </View>
    );
};

export default AddItem;
