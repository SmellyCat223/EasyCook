import { FC, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../app/supabase';

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

  // Create refs for each TextInput
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
          .upsert({ // add all fields required for profiles
            id: data.user.id,
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
          });

        if (profileError) {
          throw profileError;
        }

        // Handle successful sign-up
        console.log('User signed up successfully:', data.user);
        setRegistrationMessage('User signed up successfully.\nPlease sign in.');
      };

      setSubmitting(false);
    } catch (error: any) {
      console.log('Error signing up user:', error);
      setRegistrationMessage(`${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
                    returnKeyType="next"
                    onSubmitEditing={() => emailInputRef.current?.focus()}
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
                    ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneInputRef.current?.focus()}
                  />
                </View>

                {/* <View className="mb-3">
                  <TextInput
                    className="bg-zinc-900 border border-stone-700 text-white rounded-full p-3 opacity-70"
                    id="phone"
                    placeholder="Phone number"
                    placeholderTextColor="#44403c"
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    value={props.values.phone}
                    ref={phoneInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                </View> */}

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
                    ref={passwordInputRef}
                    returnKeyType="done"
                  />
                </View>
                <View className="items-center space-y-2 mb-2">
                  <Text className="text-zinc-700">{registrationMessage}</Text>
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
    </KeyboardAvoidingView>
  );
};

export default SignUp;