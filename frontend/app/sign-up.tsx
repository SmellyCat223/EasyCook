import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface SignUpProps {
  switchComponent: () => void;
}

const SignUp: FC<SignUpProps> = ({ switchComponent }) => {

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
      <View className="flex-row justify-between p-4 items-center">
        <View className="p-2 items-center">
          <TouchableOpacity
            onPress={switchComponent}
          >
            <Text className="text-base text-white font-bold">SIGN IN</Text>
          </TouchableOpacity>
        </View>
        <View className="p-2 items-center border-b border-green-500">
          <Text className="text-base text-white font-bold">SIGN UP</Text>
        </View>
      </View>

      <View className="flex p-4">
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View>
              <View className="space-y-2">
                <View className="mb-3">
                  <TextInput
                    className="bg-white border border-gray-300 rounded-full p-3"
                    id="username"
                    placeholder="Username"
                    placeholderTextColor="#6b7280"
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                  />
                </View>

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
                  className="w-full items-center bg-green-500 p-3 rounded-full text-white"
                >
                  <Text className="font-bold text-white">SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignUp;