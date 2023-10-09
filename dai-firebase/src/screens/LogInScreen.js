import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Text style={styles.baseText}>Ingresa tu cuenta</Text>

        <View style={[styles.inputContainer, styles.button]}>
          <TextInput
            style={styles.input}
            placeholder="Mail:"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={[styles.inputContainer, styles.button]}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña:"
            value={contraseña}
            onChangeText={(text) => setContraseña(text)}
            
          />
          <TouchableOpacity style={styles.showPasswordButton}>
            
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleCreateAccount} style={styles.buttonChico}  >
          <Text  style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSingIn} style={styles.buttonChico}  >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    textAlign: 'center',
    marginTop: 180,
    marginBottom: 30,
    color: '#668557',
    /*fontFamily: 'Crimson Text',*/
    fontSize: 25,
  /*   lineHeight: 24, */
  },
  container: {
    height: '100%',
    width: '80%',
    alignItems:'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  showPasswordButton: {
    paddingHorizontal: 10,
    left: 15,
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#99D87D',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    /* shadowOpacity: 0.6, */
    elevation: 5,
  },
  buttonChico: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '50%',
    borderRadius: 15,
    backgroundColor: '#99D87D',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowRadius: 15,
    shadowColor: '#2C4521',
    /* shadowOpacity: 0.6, */
    elevation: 5,
  },
  buttonText: {
    color: '#2C4521',
    /* fontFamily: 'assets/fonts/UberMoveMedium.otf', */
    fontSize: 16,
    fontStyle: 'normal',
    justifyContent:'center',
    alignContent:'center',
  /*   lineHeight: 18, */
  },
  semiCircle: {
    /* position: 'absolute', */
    top: 0,
    left: 0,
  },
});

export default LogInScreen;