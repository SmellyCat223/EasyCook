import { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BACKEND_PORT, IP } from '../base';

interface FormValues {
  username: string;
  email: string;
  phoneNo: string;
  password: string;
}

interface SignUpProps {
  switchComponent: () => void;
}

const SignUp: FC<SignUpProps> = ({ switchComponent }) => {

  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post(`${IP}:${BACKEND_PORT}/api/user/register`, values); // use backend port

      // Handle the response
      console.log(response.data); // Assuming your backend returns a message

      setRegistrationMessage(`${response.data.message}`);

      setSubmitting(false);
    } catch (error: any) {
      console.error(error);
      setRegistrationMessage(`${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <View>
      <View className="items-center">
        <View className="flex-row justify-between p-4 w-4/5 items-center">
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
      </View>

      <View className="flex py-4">
        <Formik
          initialValues={{ username: '', email: '', phoneNo: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View>
              <View className="space-y-1">
                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                    id="username"
                    placeholder="Username"
                    placeholderTextColor="#44403c"
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                  />
                </View>

                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                    id="email"
                    placeholder="Email"
                    placeholderTextColor="#44403c"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                  />
                </View>

                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                    id="password"
                    placeholder="Phone number"
                    placeholderTextColor="#44403c"
                    onChangeText={props.handleChange('phoneNo')}
                    onBlur={props.handleBlur('phoneNo')}
                    value={props.values.phoneNo}
                  />
                </View>

                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                    id="password"
                    placeholder="Password"
                    placeholderTextColor="#44403c"
                    secureTextEntry={true}
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
        <View className="p-6 items-center">

        {registrationMessage && (
          <View className="items-center space-y-2">
            <Text className="text-zinc-700">{registrationMessage}</Text>
            <TouchableOpacity
              onPress={switchComponent}
            >
              <View className="flex flex-row">
                <Text className="text-zinc-700">Click here to </Text>
                <Text className="text-blue-500">sign in</Text>
                <Text className="text-zinc-700">.</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </View>
    </View>
  );
};

export default SignUp;