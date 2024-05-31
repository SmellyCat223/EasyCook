import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Formik, FormikProps, FormikHelpers } from 'formik';
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
    <View className="flex-1 justify-center items-center bg-stone-950">
      <View className="space-y-2 text-center">
        <Text className="text-3xl text-white font-bold">Login</Text>
        <Text className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </Text>
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <View className="space-y-4">
            <View className="mb-3">
              <Text className="text-white">Email</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                id="email"
                placeholder="Enter your email"
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
              />
            </View>
            <View className="mb-3">
              <Text className="text-white">Password</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                id="password"
                placeholder="Enter your password"
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
              />
            </View>
            <TouchableOpacity
              onPress={() => props.handleSubmit()}
              className="bg-blue-500 p-2 rounded text-white w-full"
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View className="p-4">
        <Link href="./register">
          <Text className="text-white">Register here</Text>
        </Link>
      </View>
    </View>
  );
};

export default Login;