//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../Styles/Color';
// create a component
const ChatHeader = (props) => {
    const { data } = props;
    // const [lastSeen, setlastSeen] = useState('')
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.theme} translucent={false} />
            <View
                style={{ flex: 1, marginLeft: 10 }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: COLORS.white,
                        fontSize: 16,
                        textTransform: 'capitalize'
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
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',

    },
});

//make this component available to the app
export default ChatHeader;