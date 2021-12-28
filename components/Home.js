import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home({navigation}) {

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [fromShow, setFromShow] = useState(false);
    const [toShow, setToShow] = useState(false);

    const onFromChange = (event, selectedDate) => {
        let currentDate = selectedDate || fromDate;
        setFromShow(Platform.OS === 'ios');
        currentDate.setUTCHours(0, 0, 0, 0);
        setFromDate(currentDate);
    };

    const onToChange = (event, selectedDate) => {
        let currentDate = selectedDate || toDate;
        setToShow(Platform.OS === 'ios');
        currentDate.setUTCHours(0,0,0,0);
        setToDate(currentDate);
    };

    const showFromMode = (currentMode) => {
        setFromShow(true);
        setMode(currentMode);
    };

    const showToMode = (currentMode) => {
        setToShow(true);
        setMode(currentMode);
    };

    const showFromDatepicker = () => {
        showFromMode('date');
    };

    const showToDatepicker = () => {
        showToMode('date');
    };

    const pressedBearish = () => {
        
        const unixFrom = parseInt((fromDate.getTime() / 1000).toFixed(0))
        const unixTo = parseInt((toDate.getTime() / 1000).toFixed(0))
        navigation.navigate('Bearish', { unixFrom, unixTo })
    }

    const pressedHighest = () => {
        const unixFrom = parseInt((fromDate.getTime() / 1000).toFixed(0))
        const unixTo = parseInt((toDate.getTime() / 1000).toFixed(0))
        navigation.navigate('Highest', { unixFrom, unixTo })
    }

    const pressedVolumes = () => {
        const unixFrom = parseInt((fromDate.getTime() / 1000).toFixed(0))
        const unixTo = parseInt((toDate.getTime() / 1000).toFixed(0))
        navigation.navigate('Volume', { unixFrom, unixTo })
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttoncontainer}>
                <Button style={styles.button} onPress={showFromDatepicker} title="Pick a 'from' date" />
                <Button style={styles.button} onPress={showToDatepicker} title="Pick a 'to' date " />
            </View>
            {fromShow && (
                <DateTimePicker
                    value={fromDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onFromChange}
                />
            )}
            {toShow && (
                <DateTimePicker
                    value={toDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onToChange}
                />
            )}
            <View>
                <Text>from: {fromDate.getDate() + '.' + (fromDate.getMonth() + 1) + '.' + fromDate.getFullYear()}</Text>
            </View>
            <View>
                <Text>to: {toDate.getDate() + '.' + (toDate.getMonth() + 1) + '.' + toDate.getFullYear()}</Text>
            </View>
            <Pressable onPress={() => {pressedBearish()}}>
                <Text>Check longest bearish</Text>
            </Pressable>
            <Pressable onPress={() => { pressedHighest() }}>
                <Text>Check the best days to buy and sell!</Text>
            </Pressable>
            <Pressable onPress={() => { pressedVolumes() }}>
                <Text>Check Volumes!</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        padding: 10

    }
})
