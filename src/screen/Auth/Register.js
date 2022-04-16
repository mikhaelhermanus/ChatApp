import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { COLORS } from '../../Styles/Color';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';


const Register = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const onRegister = async () => {
        setLoading(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                const userf = auth().currentUser
                userf.updateProfile({ displayName: name })
                Alert.alert('Success', `${name} Was Successful Created`)
            })
            .catch(error => {
                setLoading(false)
                Alert.alert('Oops', error.code)
            });
    }

    const onRegisterWithRDB = async () => {
        if (name == '' || email == '' || password == '') {
            Alert.alert('Error', 'Harap isi Semua field')
            return false;
        }
        let data = {
            id: uuid.v4(),
            name: name,
            emailId: email,
            password: password,
        };
        try {
            database()
                .ref('/users/' + data.id)
                .set(data)
                .then(() => {
                    Alert.alert('Success', 'Register Successfully!');
                    setEmail('')
                    setPassword('')
                    props.navigation.navigate('Login')
                });
        } catch (error) {
            Alert.alert('Error', error)
        }

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter Email Id"
                    keyboardType="number-pad"
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
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                        setPassword(value)
                    }}
                    value={password}
                    placeholderTextColor={COLORS.liteBlack}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Enter Username"
                    keyboardType="number-pad"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                        setName(value)
                    }}
                    value={name}
                    placeholderTextColor={COLORS.liteBlack}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => onRegisterWithRDB()}
            >
                {
                    loading ?
                        <ActivityIndicator color={COLORS.white} />
                        :
                        <Text style={styles.btnText}>Register</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    inputs: {
        borderBottomColor: COLORS.white,
        color: COLORS.liteBlack,
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