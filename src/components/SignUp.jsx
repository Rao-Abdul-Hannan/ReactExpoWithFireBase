import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { app } from '../db/config'
import { TextInput } from 'react-native-gesture-handler'

const auth = getAuth(app)

const SignUp = ({ navigation }) => {
    const [signUp, setSignUp] = useState({
        email: "",
        password: "",
    })

    const handleInput = (key, value) => {
        setSignUp({
            ...signUp, [key]: value
        })
    }

    const handleSubmit = async () => {

        try {
            await createUserWithEmailAndPassword(auth, signUp.email, signUp.password);
            Alert.alert("Your account is successfully created");
            setSignUp({
                email: "",
                password: "",
            })
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    return (
        <View>
            <TextInput
                style={styles.formInput}
                placeholder='Email'
                onChangeText={text => handleInput("email", text)}
                value={signUp.email}
                autoFocus={true}
            />
            <TextInput
                style={styles.formInput}
                placeholder='Password'
                onChangeText={text => handleInput("password", text)}
                value={signUp.password}
            />
            <View >
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {width: 200}]} onPress={() => navigation.navigate("Login")}>
                    <Text>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp

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