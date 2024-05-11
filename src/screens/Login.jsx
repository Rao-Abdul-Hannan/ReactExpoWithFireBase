import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../db/config'
import { useNavigation } from '@react-navigation/native'

const auth = getAuth(app)

const Login = () => {

    const navigation = useNavigation();

    const [logIn, setLogIn] = useState({
        email: "",
        password: "",
    })

    const handleInput = (key, value) => {
        setLogIn({
            ...logIn, [key]: value
        })
    }

    const handleSubmit = async () => {

        try {
            await signInWithEmailAndPassword(auth, logIn.email, logIn.password);
            
            Alert.alert ("Login is successful");

            setLogIn({
                email: "",
                password: "",
            })

            navigation.navigate('Tasks')

        } catch (error) {
            Alert.alert (error.message);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={styles.formInput}
                placeholder='Email'
                onChangeText={text => handleInput("email", text)}
                value={logIn.email}
                autoFocus={true}
            />
            <TextInput
                style={styles.formInput}
                placeholder='Password'
                onChangeText={text => handleInput("password", text)}
                value={logIn.password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    formInput: {
        margin: 5,
        borderWidth: 3,
        borderRadius: 7,
        padding: 5,
        width: 300
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