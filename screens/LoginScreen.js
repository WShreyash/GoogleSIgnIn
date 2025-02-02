import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (isLogin) {
      signInWithEmail(email, password);
    } else {
      signUpWithEmail(email, password);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-8`}>
      <Text style={tw`text-4xl font-bold mb-10 text-black`}>Login</Text>
      
      <TextInput
        style={tw`h-12 w-full border border-gray-300 rounded-full px-4 text-lg mb-4`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={tw`h-12 w-full border border-gray-300 rounded-full px-4 text-lg mb-4`}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={tw`bg-blue-500 w-full py-3 rounded-full shadow-md mb-4`}
        onPress={handleAuth}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={tw`text-blue-500 text-lg`}>{isLogin ? 'Sign Up Instead' : 'Log In Instead'}</Text>
      </TouchableOpacity>
      
      <Text style={tw`text-gray-500 my-4`}>OR</Text>
      
      <TouchableOpacity 
        style={tw`flex-row items-center justify-center bg-gray-100 w-full py-3 rounded-full shadow-sm`}
        onPress={signInWithGoogle}
      >
        <FontAwesome name="google" size={20} color="red" style={tw`mr-2`} />
        <Text style={tw`text-gray-800 text-lg font-semibold`}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

