//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../Styles/Color';
import { FONTS } from '../Constant/Font';
import { Icon } from 'native-base';

// create a component
const ChatHeader = (props) => {
    const { data } = props;
    // console.log("cht saa",data);

    const [lastSeen, setlastSeen] = useState('')

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} translucent={false} />
            {/* <Text>back</Text> */}
            {/* <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.white,
                }}
                name = "chevron-back"
                type = "Ionicons"
                // onPress = {() => Navigation.back()}
            />
           */}

            <View 
                style={{flex:1, marginLeft: 10}}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: COLORS.white,
                        fontSize: 16,
                        textTransform:'capitalize'
                    }}
                >
                    {data.name}
                </Text>

                {/* <Text
                    style={{ color: COLORS.primaryBackground, fontSize: 10,fontFamily: FONTS.Regular }}
                >
                    {lastSeen}
                </Text> */}
            </View>

            {/* <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.themeColor
                }}
                name="videocam-outline"
                type="Ionicons"
            /> */}

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height:70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',

    },
});

//make this component available to the app
export default ChatHeader;