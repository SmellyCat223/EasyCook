import { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../UserContext';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';

interface FormValues {
  email: string;
  password: string;
}

interface SignInProps {
  switchComponent: () => void;
}

const SignIn: FC<SignInProps> = ({ switchComponent }) => {
  const { setUsername } = useUser(); // Use the useUser hook
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleForgotPassword = () => {
    alert("Feature coming soon!");
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      // Sign in the user using Supabase
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        // Fetch the user profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        // Store the username in session or global state
        // console.log('Setting username:', profile.username);
        setUsername(profile.username);
        // console.log('SignIn - username set:', profile.username);

        // Redirect to the main page after successful login
        router.push('/(tabs)');

        // Optionally, you can handle any additional user data storage or UI navigation here.
      } else {
        throw new Error('User information not available');
      }

      setSubmitting(false);
    } catch (error: any) {
      console.error('Error signing in user:', error.message);
      // Set the login message to the error message if an error occurs
      setLoginMessage(`${error.message}`);
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
              {loginMessage && (
                <View className="items-center space-y-2 mb-2">
                  <Text className="text-zinc-700">{loginMessage}</Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => props.handleSubmit()}
                className="bg-green-500 p-3 rounded-full items-center text-white w-full"
              >
                <Text className="font-bold text-white">SIGN IN</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View className="p-3 items-center space-y-2">
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="text-zinc-700">Forgot password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;