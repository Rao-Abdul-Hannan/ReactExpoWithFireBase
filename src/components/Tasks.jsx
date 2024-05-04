import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBoxUi from './CheckBoxUI'
import db from "../../db/config"

const Tasks = () => {
    const [tasks, setTasks] = useState({})

    useEffect(() => {
        db.collection('tasks')
            .get()
            .then(result => result.docs)
            .then(docs => docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                createdAt: doc.data().createdAt,
                completedAt: doc.completedAt
            })))
            .then(tasks => setTasks(tasks))

    }, [])

    return (
        <View>
            <View>
                {tasks?.map(task => <View>
                    <Text>{task.name}</Text>
                    <CheckBoxUi value={!!task.completedAt} />
                </View>
                )}
            </View>

            {/* <View>
                <Text>Lift weight</Text>
                <CheckBoxUi value={false} />
            </View> */}
        </View>
    )
}

export default Tasks

const styles = StyleSheet.create({})