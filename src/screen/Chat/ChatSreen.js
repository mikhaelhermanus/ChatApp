import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, FlatList } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { COLORS } from '../../Styles/Color';
import ChatHeader from '../../component/ChatHeader';
import MsgComponent from '../../component/MsgComponent';
import { Icon } from 'native-base';
import database from '@react-native-firebase/database';
import moment from 'moment';

const ChatScreen = props => {
    const { params } = props.route
    const receiverData = params.receiverData
    const userData = params.userData
    console.log('receiverData', receiverData);

    const [msg, setMsg] = useState('');
    const [disabled, setdisabled] = useState(false);
    const [allChat, setallChat] = React.useState([]);


    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + receiverData.roomId)
            .on('child_added', snapshot => {
                // console.log('A new node has been added', snapshot.val());
                setallChat((state) => [snapshot.val(), ...state]);
            });
        // Stop listening for updates when no longer required
        return () => database().ref('/messages' + receiverData.roomId).off('child_added', onChildAdd);
    }, [receiverData.roomId]);

    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
    const sendMsg = () => {
        if (msg == '' || msgvalid(msg) == 0) {
            SimpleToast.show('Enter something....');
            return false;
        }
        setdisabled(true);
        let msgData = {
            roomId: receiverData.roomId,
            message: msg,
            from: userData?.id,
            to: receiverData.id,
            sendTime: moment().format(''),
            msgType: 'text',
        };

        const newReference = database()
            .ref('/messages/' + receiverData.roomId)
            .push();
        msgData.id = newReference.key;
        newReference.set(msgData).then(() => {
            let chatListupdate = {
                lastMsg: msg,
                sendTime: msgData.sendTime,
            };
            database()
                .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
                .update(chatListupdate)
                .then(() => console.log('Data updated.'));
            console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData)
            database()
                .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
                .update(chatListupdate)
                .then(() => console.log('Data updated.'));

            setMsg('');
            setdisabled(false);
        });
    };

    return (
        <View style={styles.container}>
            <ChatHeader data={receiverData} />
            <ImageBackground
                source={require('../../Assets/background2.jpeg')}
                style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({ item }) => {
                        return (
                            <MsgComponent
                                sender={item.from == userData.id}
                                item={item}
                            />
                        );
                    }}
                />
            </ImageBackground>
            <View
                style={{
                    backgroundColor: COLORS.theme,
                    elevation: 5,
                    // height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 7,
                    justifyContent: 'space-evenly',
                    paddingBottom : 20
                }}>
                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        width: '80%',
                        borderRadius: 25,
                        borderWidth: 0.5,
                        borderColor: COLORS.white,
                        paddingHorizontal: 15,
                        color: COLORS.black,
                        paddingBottom : 10
                    }}
                    placeholder="type a message"
                    placeholderTextColor={COLORS.black}
                    multiline={true}
                    value={msg}
                    onChangeText={val => setMsg(val)}
                />

                <TouchableOpacity disabled={disabled} onPress={()=>sendMsg()}>
                    <Text style={{ color: COLORS.white }}>Send!</Text>
                    {/* <Icon
                        style={{
                            // marginHorizontal: 15,
                            color: COLORS.white,
                        }}
                        name="paper-plane-sharp"
                        type="Ionicons"
                    /> */}
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});