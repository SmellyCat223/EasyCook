import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
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
    <View className="flex-1 justify-center items-center p-4 bg-stone-950">
      <View className="space-y-2 text-center">
        <Text className="text-3xl text-white font-bold">Register</Text>
        <Text className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </Text>
      </View>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <View className="space-y-4">
            <View className="mb-3">
              <Text className="text-white">Username</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                placeholder="Enter username"
                onChangeText={props.handleChange('username')}
                value={props.values.username}
              />
            </View>

            <View className="mb-3">
              <Text className="text-white">Email</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                placeholder="Enter email"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />
            </View>

            <View className="mb-3">
              <Text className="text-white">Pasword</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                placeholder="Enter password"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
              />
            </View>
            <TouchableOpacity
              onPress={() => props.handleSubmit()}
              className="bg-blue-500 p-2 rounded text-white w-full"
            >
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View className="p-4">
        <Link href="./login">
          <Text className="text-white">Login here</Text>
        </Link>
      </View>
    </View>
  )
}

export default Register;