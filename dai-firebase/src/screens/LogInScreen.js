import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, StatusBar, Pressable, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import tailwind from "twrnc";


const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
    const navigation = useNavigation();
  //funciones inicio y login with firebase 
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app) 

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, contraseña)
        .then((userCredentials) => {
            console.log("cuenta creada con exito")
            const user = userCredentials.user;
            console.log(user);
        })
        .catch (error => {
            console.log(error);
            alert(error.message)
         })
    }

    const handleSingIn = () => {
        signInWithEmailAndPassword(auth, email, contraseña)
        .then((userCredentials) => {
            console.log("Singned In!!")
            const user = userCredentials.user;
            console.log(user);
            navigation.navigate('Home')
        })
        .catch (error => {
            console.log(error);
            alert(error.message)
         })
    }
    const handleGoogleSignIn = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          console.log('Google Sign-In Successful:', user);
          navigation.navigate('Home')
          // Navigate to the next screen or perform any necessary actions.
        } catch (error) {
          console.error('Google Sign-In Error:', error);
        }
      };

  return (
    <View style={tailwind`flex-1 w-full items-center justify-center bg-gray-500`}>
    <View style={tailwind`px-4 w-full max-w-sm`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-gray-50`}>
        Login
      </Text>

      <View style={tailwind`flex flex-col gap-4 `}>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          
          placeholder="Enter email address"
          style={tailwind`text-white border border-gray-700 p-2 rounded-lg box-shadow-6`}
        />
        <TextInput
          value={contraseña}
          onChangeText={(text) => setContraseña(text)}
          secureTextEntry={true}
          style={tailwind`text-white border border-gray-700 p-2 rounded-lg box-shadow-6`}
          placeholder="Enter password"
        />
      </View>

      <View style={tailwind`flex flex-row justify-between my-8`}>
        <View style={tailwind`flex-row items-center`}>
          <Pressable style={tailwind`bg-gray-50 h-6 w-6 rounded-sm mr-2`}></Pressable>
          <Text style={tailwind`text-gray-50`}>Remember me</Text>
        </View>
        <Pressable>
          <Text style={tailwind`text-gray-50 font-bold`}>Reset password</Text>
        </Pressable>
      </View>

      <Pressable style={tailwind`bg-green-700 hover:bg-green-800 text-green-50 rounded-lg`} onPress={handleSingIn}>
        <Text style={tailwind`h-10 px-4 flex-row items-center justify-center rounded-md text-center mt-5 text-white `}>Sign In</Text>
      </Pressable>

      <Pressable onPress={handleCreateAccount} style={tailwind`flex-row items-center justify-center px-4 py-2 rounded-md -mb-2`}>
      <Icon name="" size={24} color="white" />
      <Text style={tailwind`text-gray-200 ` } >Registrarse</Text>
    </Pressable>

      <View style={tailwind`flex flex-row justify-between my-5`}>
        <Pressable style={tailwind`flex-row items-center bg-red-700 px-4 py-2 rounded-md`} onPress={handleGoogleSignIn}>
          <Icon name="google" size={24} color="white" />
          <Text style={tailwind`text-white ml-2`}>Sign in with Google</Text>
        </Pressable>
        <Pressable style={tailwind`flex-row items-center bg-blue-700 px-4 py-2 rounded-md`}>
          <Icon name="facebook" size={24} color="white" />
          <Text style={tailwind`text-white ml-2`}>Sign in with Facebook</Text>
        </Pressable>
      </View>
 
    </View>
  </View>
  );
};



export default LogInScreen;