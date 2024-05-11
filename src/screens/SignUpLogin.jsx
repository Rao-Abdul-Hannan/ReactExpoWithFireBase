import { StyleSheet, View } from 'react-native'
import React from 'react'
import SignUp from '../components/SignUp'
import { useNavigation } from '@react-navigation/native'

const SignUpLogin = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SignUp navigation={navigation} />
        </View>
    )
}

export default SignUpLogin

const styles = StyleSheet.create({
})