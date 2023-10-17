import React from 'react';
import { Text, View, Button } from 'react-native';
import { FIREBASE_AUTH } from "../../firebase/config";
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation, route }) {
  const userData = route.params.userData;

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      //falta hacer que vuelva a login
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>User ID: {userData.id}</Text>
      <Text>User Email: {userData.email}</Text>
      <Text>User Full Name: {userData.fullName}</Text>
      <Button title="Logout" onPress={handleLogout} />
      {/*Falta hacer carga de datos*/}
    </View>
  );
}