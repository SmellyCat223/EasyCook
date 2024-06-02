import { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
      const response = await axios.post('http://192.168.1.113:3000/api/user/register', values); // use backend port

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
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View>
              <View className="space-y-1">
                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-700 border border-gray-300 text-white rounded-full p-3 opacity-80"
                    id="username"
                    placeholder="Username"
                    placeholderTextColor="#f9fafb"
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                  />
                </View>

                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-700 border border-gray-300 text-white rounded-full p-3 opacity-80"
                    id="email"
                    placeholder="Email"
                    placeholderTextColor="#f9fafb"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                  />
                </View>

                <View className="mb-3">
                  <TextInput
                    className="bg-zinc-700 border border-gray-300 text-white rounded-full p-3 opacity-80"
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