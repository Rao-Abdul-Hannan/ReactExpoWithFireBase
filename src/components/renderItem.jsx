import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CheckBoxUi from "./CheckBoxUI"
import { doc, updateDoc } from 'firebase/firestore'
import db from '../db/config'
import { useNavigation } from '@react-navigation/native'

const RenderItem = ({ item, navigation }) => {
    // const navigation = useNavigation();
    const updateTask = async (taskId, value) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await updateDoc(taskDocRef, { completedAt: value ? new Date : null })
            Alert.alert("Task updated successfully")
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const goToUpdateTasks  = () => {
        navigation.navigate("Update Tasks", { taskId: item.id }); // Pass taskId as route parameter
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={goToUpdateTasks}>
                <Text style={styles.taskName}>{item.name}</Text>
            </TouchableOpacity>

            <CheckBoxUi value={!!item.completedAt} onValueChange={(value) => updateTask(item.id, value)} />
        </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }
})
