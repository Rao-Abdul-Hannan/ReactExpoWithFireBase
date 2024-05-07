import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CheckBoxUi from "./CheckBoxUI"
import { doc, updateDoc } from 'firebase/firestore'
import db from '../db/config'

const RenderItem = ({item}) => {
    const updateTask = async (taskId, value) => {
        try {
            const taskDocRef = doc(db, 'tasks', taskId);
            await updateDoc(taskDocRef, { completedAt: value ? new Date : null })
            Alert.alert("Task updated successfully")
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }
    return (
        <View>
            <Text>{item.name}</Text>
            <CheckBoxUi value={!!item.completedAt} onValueChange={(value) => updateTask(item.id, value)} />
        </View>
    )
}

export default RenderItem

const styles = StyleSheet.create({})
