import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, SafeAreaView, StyleSheet,TouchableOpacity } from 'react-native'

import uuid from 'react-native-uuid';
import { COLORS } from '../../Styles/Color';
import database from '@react-native-firebase/database';

const DashboardUser = props => {
    const [search, setsearch] = useState('');
    const [allUser, setallUser] = useState([]);
    const [allUserBackup, setallUserBackup] = useState([]);

    const { params } = props.route
    const navigation = props.navigation
    const userData = params.userData
    

    useEffect(() => {
        getAllUser();
    }, []);


    const getAllUser = () => {
        database()
            .ref('users/')
            .once('value')
            .then(snapshot => {
                console.log('all User data: ', Object.values(snapshot.val()));
                setallUser(
                    Object.values(snapshot.val()).filter(it => it.id != userData.id),
                );
                setallUserBackup(
                    Object.values(snapshot.val()).filter(it => it.id != userData.id),
                );
            });
    };

    const createChatList = data => {
        database()
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());

                if (snapshot.val() == null) {
                    let roomId = uuid.v4();
                    let myData = {
                        roomId,
                        id: userData.id,
                        name: userData.name,
                        emailId: userData.emailId,
                        lastMsg: '',
                    };
                    database()
                        .ref('/chatlist/' + data.id + '/' + userData.id)
                        .update(myData)
                        .then(() => console.log('Data updated.'));

                    delete data['password'];
                    data.lastMsg = '';
                    data.roomId = roomId;
                    database()
                        .ref('/chatlist/' + userData.id + '/' + data.id)
                        .update(data)
                        .then(() => console.log('Data updated.'));

                    navigation.navigate('ChatScreen', { receiverData: data, userData : userData });
                } else {
                    navigation.navigate('ChatScreen', { receiverData: snapshot.val(), userData : userData });
                }
            });
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>createChatList(item)}>
            <View style={styles.card}  >
                <Text style={styles.nameCard}>{item.name}</Text>
            </View>
            </TouchableOpacity>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={allUser}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default DashboardUser

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '90%',
        marginLeft: 5,
        backgroundColor: COLORS.white,
        borderColor: COLORS.green,
        borderRadius: 10,
        justifyContent: 'center',
        height: 50,
        borderWidth: 2,
        marginTop: 10
    },
    nameCard:
        { fontSize: 14, color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }
})