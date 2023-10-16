import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles'
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }
  
  const onLoginPress = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        const userRef = doc(FIRESTORE_DB, 'users', uid);
  
        try {
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            navigation.navigate('Home', {  userData }); // Aquí navegamos a 'Home' con los datos del usuario
          } else {
            alert('User does not exist.');
          }
        } catch (error) {
          alert(error.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../logo.jpg')}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>¿Aun No Tienes Una Cuenta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Registrarte</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}