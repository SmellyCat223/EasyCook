import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

  // const handleSubmit = (
  //   values: FormValues,
  //   { setSubmitting }: FormikHelpers<FormValues>
  // ) => {
  //   // Handle form submission
  //   console.log(values);
  //   setSubmitting(false);
  // };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('http://192.168.4.13:3000/api/user/login', values); // use backend port

      // Handle the response
      console.log(response.data); // Assuming your backend returns a message
  
      setSubmitting(false);
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
                  className="bg-zinc-700 border border-gray-300 text-white rounded-full p-3 opacity-20"
                  id="email"
                  placeholder="Email"
                  placeholderTextColor="#f9fafb"
                  selectionColor="#fafafa"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </View>
              <View className="mb-3">
                <TextInput
                  className="bg-zinc-700 border border-gray-300 text-white rounded-full p-3 opacity-20"
                  id="password"
                  placeholder="Password"
                  placeholderTextColor="#f9fafb"
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