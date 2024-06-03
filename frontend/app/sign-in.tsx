import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BACKEND_PORT, IP } from '../base';

interface FormValues {
  email: string;
  password: string;
}

interface SignInProps {
  switchComponent: () => void;
}

const SignIn: FC<SignInProps> = ({ switchComponent }) => {

  const router = useRouter();
  
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

      console.log(`${IP}:${BACKEND_PORT}/api/user/login`);

      const response = await axios.post(`${IP}:${BACKEND_PORT}/api/user/login`, values); // use backend port

      // Handle the response
      console.log(response.data); // Assuming your backend returns a message
  
      setSubmitting(false);

      if (response.data.message == "User logged in successfully") {
        router.push('/(tabs)');
      };

    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <View>
      <View className="items-center">
        <View className="flex-row justify-between w-4/5 p-4">
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
      </View>


      <View className="flex py-4">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View className="space-y-1">
              <View className="mb-3">
                <TextInput
                  className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                  id="email"
                  placeholder="Email"
                  placeholderTextColor="#44403c"
                  selectionColor="#fafafa"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
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
                className="bg-green-500 p-3 rounded-full items-center text-white w-full"
              >
                <Text className="font-bold text-white">SIGN IN</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View className="p-6 items-center">
          <TouchableOpacity
            onPress={() => console.log("Forgot password")}
          >
            <Text className="text-zinc-700">Forgot password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;