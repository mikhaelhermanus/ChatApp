import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    StyleSheet
} from 'react-native'
import { COLORS } from '../../Styles/Color';
import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                props.navigation.navigate('ChatScreen', { email: email })
            })
            .catch(error => {
                Alert.alert('Error', error.code)
            });
    }

    const onLoginRDB = () => {
        try {
            database()
                .ref('users/')
                .orderByChild("emailId")
                .equalTo(email)
                .once('value')
                .then(async snapshot => {
                    if (snapshot.val() == null) {
                        Alert.alert("Invalid Email Id")
                        return false;
                    }
                    let userData = Object.values(snapshot.val())[0];
                    if (userData?.password != password) {
                       Alert.alert("Error", "Invalid Password!");
                        return false;
                    }
                    console.log('User data: ', userData);
                    props.navigation.navigate('DashboardUser',{ userData: userData })
                });
        } catch (error) {
            Alert.alert('Error', 'Not Found User')
        }

    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter Email Id"
                    // keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                        setEmail(value)
                    }}
                    value={email}
                    placeholderTextColor={COLORS.liteBlack}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter Password"
                    // keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                        setPassword(value)
                    }}
                    value={password}
                    placeholderTextColor={COLORS.liteBlack}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => onLoginRDB()}
            >
                <Text style={styles.btnText}>Login Now</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text>Not Have Account ?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                    <Text>Register Here!!</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    inputs: {
        borderBottomColor: COLORS.white,
        color: COLORS.black,
        paddingLeft: 10,
        flex: 1
    },
    inputContainer: {
        borderRadius: 30,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginBottom: 10,
        elevation: 2,
        borderColor: COLORS.green,
        borderWidth: 2,
        width: '90%'
    },
    btnText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
    },
    btn: {
        backgroundColor: COLORS.theme,
        width: '90%',
        height: 50,
        borderRadius: 30,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})