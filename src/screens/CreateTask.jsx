import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import db from '../db/config';
import { addDoc, collection } from 'firebase/firestore';

const CreateTask = () => {
  const [name, setName] = useState('')
  
  const navigation = useNavigation();

  const handleAddTask = async () => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        name: name,
        createdAt: new Date(),
        completedAt: null,
      });
      // console.log(docRef)
      Alert.alert("Success", " Task added successfully with ID: " + docRef.id);
      // Reset form fields after successful addition
      setName('');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to add task. Please try again later.");
    }
  }

  const handleSubmit = () => {
    handleAddTask();
  }
  return (
    <View>
      <TextInput
        style={styles.formInput}
        placeholder='Task Name'
        onChangeText={text => setName(text)}
        value={name}
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!name}>
        <Text style={{ textAlign: 'center'}}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateTask

const styles = StyleSheet.create({
  formInput: {
    margin: 5,
    borderWidth: 3,
    borderRadius: 7,
    padding: 5,
  },
  button: {
    padding: 7,
    borderRadius: 5,
    margin: 10,
    width: 75,
    borderColor: 'black',
    borderWidth: 2
  }
})