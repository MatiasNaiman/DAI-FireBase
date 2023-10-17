import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebase/config";
import { FIREBASE_APP } from '../../firebase/config'
import { signOut } from 'firebase/auth';
import { doc, getDocs, setDoc, collection, addDoc } from 'firebase/firestore';
import { Keyboard } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const userData = route.params.userData;
  const reloadUser = route.params.reloadUser;
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [todosUpdated, setTodosUpdated] = useState(0);


  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      reloadUser(); //actualiza user a null se recarg y ya esta unloged
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addTodo = async () => {
    if (todo.trim() === '') return;

    try {
      await addDoc(collection(FIRESTORE_DB, 'todos'), {
        todo: todo,
        id: userData.id,
        name: userData.fullName,
      });
      setTodo(''); // Limpia el campo de entrada
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  const fetchTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'todos'));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodos(newData);
    } catch (error) {
      console.error('Error fetching todos: ', error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [todo]); 


  return (
    <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#fff',}}>
      <Text>Home Screen</Text>
      <Text>User ID: {userData.id}</Text>
      <Text>User Email: {userData.email}</Text>
      <Text>User Full Name: {userData.fullName}</Text>
      <Button title="Logout" onPress={handleLogout} />

      {/*datos*/}
      <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 16, textAlign: 'center' }}>
          Todo-App
        </Text>
        <TextInput
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          placeholder="What do you have to do today?"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <Button title="Submit" onPress={addTodo} />
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {todos.map((todo, index) => (
          <Text key={todo.id} style={{ fontSize: 18, marginBottom: 8 }}>
            {index + 1}. {todo.todo}
          </Text>
        ))}
      </ScrollView>
    </View>
       {/*Fin*/}
    
    </View>
  );
}