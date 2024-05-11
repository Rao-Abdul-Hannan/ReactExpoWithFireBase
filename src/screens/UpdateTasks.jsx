import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { db } from '../db/config';
import { Ionicons } from '@expo/vector-icons';

const UpdateTasks = () => {

    const [name, setName] = useState('')

    const navigation = useNavigation();
    const route = useRoute();
    const taskId = route.params.taskId;

    const handleDeleteTask = async () => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await deleteDoc(taskDocRef);
            Alert.alert('Task deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting task:', error);
            Alert.alert("Error deleting task");
        }
    }

    React.useLayoutEffect(( ) => {
        navigation.setOptions ({
            headerRight: () => (
                <TouchableWithoutFeedback onPress={handleDeleteTask}>
                    <Ionicons name={"trash-outline"} size={30} style={{ marginRight: 20 }} color={'red'} />
                </TouchableWithoutFeedback>
            )
        })
    })

    const handleUpdateTask = async () => {
        try {
            const taskDocRef = doc (db, 'tasks', taskId);
            await updateDoc(taskDocRef, { name: name }); // Update the task name
            Alert.alert("Task updated successfully");
            setName('');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating task:', error);
            Alert.alert("Error", "Failed to update task. Please try again later.");
        }
    }

    const handleSubmit = () => {
        handleUpdateTask();
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ textAlign: 'center' }}>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateTasks

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