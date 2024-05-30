import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, Field, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="space-y-2 text-center">
        <Text className="text-3xl font-bold">Login in</Text>
        <Text className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </Text>
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <View className="space-y-4">
            <View className="mb-3">
              <Text>Email</Text>
              <Field
                type="email"
                name="email"
                as={TextInput}
                className="bg-white border border-gray-300 rounded p-2"
                placeholder="Enter your email"
              />
            </View>
            <View className="mb-3">
              <Text>Password</Text>
              <Field
                type="password"
                name="password"
                as={TextInput}
                className="bg-white border border-gray-300 rounded p-2"
                placeholder="Enter your password"
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit}
              className="bg-blue-500 p-2 rounded text-white w-full"
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;