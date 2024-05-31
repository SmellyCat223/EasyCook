import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

interface SignInProps {
  switchComponent: () => void;
}

const SignIn: FC<SignInProps> = ({ switchComponent }) => {

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
    <View>
      {/* <Text className="text-white">test</Text> */}
      <View className="flex-row justify-between p-4 items-center">
        <View className="p-2 border-b border-green-500 items-center">
          <Text className="text-base text-white font-bold">SIGN IN</Text>
        </View>
        <View className="p-2 items-center">
          <TouchableOpacity
            onPress={switchComponent}
          >
            <Text className="text-base text-white font-bold">SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex p-4">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View className="space-y-2">
              <View className="mb-3">
                <TextInput
                  className="bg-white border border-gray-300 rounded-full p-3"
                  id="email"
                  placeholder="Email"
                  placeholderTextColor="#6b7280"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </View>
              <View className="mb-3">
                <TextInput
                  className="bg-white border border-gray-300 rounded-full p-3"
                  id="password"
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
              </View>
              <TouchableOpacity
                onPress={() => props.handleSubmit()}
                className="bg-green-500 p-3 rounded-full items-center text-white w-full"
              >
                <Text className="font-bold text-white">SIGN IN</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignIn;