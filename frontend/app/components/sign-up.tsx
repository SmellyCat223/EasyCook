import { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../supabase';

interface FormValues {
  username: string;
  email: string;
  phone: string;
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
      // Sign up the user using Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password
      });
  
      if (error) {
        throw error;
      }
  
      // Check if data contains user information
      if (data && data.user) {
        // Update user profile with additional information
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            username: values.username,
            phone: values.phone,
          });
          
        if (profileError) {
          throw profileError;
        }
      
        // Handle successful sign-up
        console.log('User signed up successfully:', data.user);
        setRegistrationMessage('User signed up successfully.\nPlease sign in.');
    
        // Optionally, you can handle any additional user data storage or UI navigation here.
      } else {
        throw new Error('User information not available');
      }
  
      setSubmitting(false);
    } catch (error: any) {
      console.error('Error signing up user:', error);
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
          initialValues={{ username: '', email: '', phone: '', password: '' }}
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
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    value={props.values.phone}
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

          <View className="items-center space-y-2">
            <Text className="text-zinc-700">{registrationMessage}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;