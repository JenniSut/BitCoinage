import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
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

    const formatDate = (date) => {

        const formatedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        return(formatedDate)
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.pickContainer}> 
                <View style={styles.buttoncontainer}>
                    <Pressable style={styles.button} onPress={showFromDatepicker }>
                        <Text style={styles.buttonText}>Pick a 'from' date</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={showToDatepicker}>
                        <Text style={styles.buttonText}>Pick a 'to' date</Text>
                    </Pressable>
                    {/*<Button  onPress={showFromDatepicker} title="Pick a 'from' date" />
                    <Button onPress={showToDatepicker} title="Pick a 'to' date " />*/}
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
                <View style={styles.datecontainer}>
                    <Text style={styles.dateText} >from: {formatDate(fromDate)} |</Text>
                {/*</View>
                <View>*/}
                    <Text style={styles.dateText}> to: {formatDate(toDate)}</Text>
                </View>
            </View>
            <Image
                style={styles.pictures}
                source={require('../pictures/bitcoin.png')} />
            <Pressable style={styles.button} onPress={() => { pressedVolumes() }}>
                <Text style={styles.buttonText}>Check selling volumes</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {pressedBearish()}}>
                <Text style={styles.buttonText}>Check the longest bearish</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => { pressedHighest() }}>
                <Text style={styles.buttonText}>Check the best days to buy and sell</Text>
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
    pictures: {
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    pickContainer: {
        marginBottom: 60,
        borderWidth: 2,
        borderColor: 'black',
        padding: 20,
        
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    dateButton: {

    },
    datecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '100',
    },
    button: {
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10,
        borderRadius: 15,
        padding: 9,
        backgroundColor: '#5C8EEE',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '100',
    }
})
