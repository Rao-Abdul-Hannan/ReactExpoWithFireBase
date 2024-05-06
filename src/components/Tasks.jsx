import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import db from "../db/config"
import renderItem from './renderItem';

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
    }, [tasks])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
            <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id}/>
        </View>
    )
}

export default Tasks

const styles = StyleSheet.create({})