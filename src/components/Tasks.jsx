import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../db/config"
import RenderItem from "./RenderItem"
import { useNavigation } from '@react-navigation/native';


const Tasks = () => {
    const [tasks, setTasks] = useState([])

    const navigation = useNavigation();

    const fetchAllTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const taskArray = [];
            querySnapshot.forEach((doc) => {
                taskArray.push({ id: doc.id, ...doc.data() });
            })
            setTasks(taskArray);
        } catch (error) {
            console.log("Error fetching tasks: ", error);
        }
    }

    useEffect(() => {
        fetchAllTasks();
    }, [tasks])

    // here in the UI
    return (
        <View>
            <View>
                <FlatList data={tasks} renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />} keyExtractor={(item) => item.id} />
            </View>
        </View>

    )
}

export default Tasks

const styles = StyleSheet.create({
})