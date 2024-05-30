import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "./service/index.services";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
     .email("Invalid email address")
     .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const submit = await registerUser(values);
    console.log(submit.message);
    setSuccess(submit.message);
    setSubmitting(false);
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-stone-950">
      <View className="space-y-2 text-center">
        <Text className="text-3xl text-white font-bold">Create an account</Text>
        <Text className="text-gray-500 dark:text-gray-400">
          Enter your details to get started.
        </Text>
      </View>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className=""
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <View className="space-y-4">
            {success && (
              <View
                className="bg-green-500 text-center p-2 rounded text-xl text-white font-bold"
              >  
                <Text>{success}</Text>
              </View>
            )}
            <View className="mb-3">
              <Text className="text-white">Username</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                id="email"
                placeholder="Enter your username"
              />
            </View>
            <View className="mb-3">
              <Text className="text-white">Email</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                id="email"
                placeholder="Enter your email"
              />
            </View>
            <View className="mb-3">
              <Text className="text-white">Password</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded p-2"
                id="email"
                placeholder="Enter your password"
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit}
              className="bg-blue-500 p-2 rounded text-white"
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      
      <View className="p-4">
        <Link href="./login">
          <Text className="text-white">Log-in here</Text>
        </Link>
      </View>
      
    </View>
  );
};

export default Register;