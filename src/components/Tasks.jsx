import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import db from "../db/config"
import RenderItem from './RenderItem';


const Tasks = () => {
    const [tasks, setTasks] = useState([])

    const fetchAllTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const taskArray = [];
            querySnapshot.forEach((doc) => {
                taskArray.push({id: doc.id, ...doc.data()});
            })
            setTasks(taskArray);
        } catch (error) {
            console.log("Error fetching tasks: ", error);
        }
    }

    useEffect(() => {
        fetchAllTasks();
    }, [])

    return (
        <View>
            <FlatList data={tasks} renderItem={RenderItem} keyExtractor={(item) => item.id}/>
        </View>
    )
}

export default Tasks

const styles = StyleSheet.create({})