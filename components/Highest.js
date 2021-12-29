import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList, Alert } from 'react-native'

export default function Highest({ route, navigation }) {

    var { unixFrom, unixTo } = route.params;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // fetch data from api first when the screen is loaded
    useEffect(() => {
        getData();
    }, []);

    //Fetching data from api, show activityindicator if still loading
    const getData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${unixFrom}&to=${unixTo}`);
            const json = await response.json();
            //if the given dates are less than 90 days apart we get hourly data, so we'll filter out the midnight-prices only
            if (unixTo - unixFrom <= 7776000) {
                var array = json.prices.filter((i, index) => (index % 24 === 0))
                setData(array)
            }else {
                setData(json.prices)
            }
        } catch (error) {
            Alert.alert(error.message)
        } finally {
            setLoading(false);
        }
    };

    //Changing the unix dates to a more readable form
    const changeDate = (unixdate) => {
        var readableDate = new Date(unixdate * 1000)
        readableDate = readableDate.getDate() + '.' + (readableDate.getMonth() + 1) + '.' + readableDate.getFullYear()
        return (readableDate);
    };

    //Changing the unix dates that are already in milliseconds to a more reabadle form
    const showDate = (unixdate) => {
        var readableDate = new Date(unixdate)
        readableDate = readableDate.getDate() + '.' + (readableDate.getMonth() + 1) + '.' + readableDate.getFullYear()
        return (readableDate);
    };

    //Checking the highest and lowest prices and dates for comparing
    const checkHighest = () => {
            let highest = 0;
            let lowest = 10000000000000;
            let date = 0;
            let lowDate = 0;
            for (let i = 0; i < data.length; i++) {

                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][1] >= highest) {
                        highest = data[i][1];
                        date = data[i][0];
                    } else if (data[i][1] < lowest) {
                        lowest = data[i][1];
                        lowDate = data[i][0];
                      }
                }
            };

            return (
                (lowDate > date) ?
                    <Text style={styles.text}>You shouldn't buy (or sell) bitcoin between {changeDate(unixFrom)} and {changeDate(unixTo)}!</Text>
                    : <Text style={styles.text}>The best day to buy Bitcoin between {changeDate(unixFrom)} and {changeDate(unixTo)} was 
                        <Text style={{ fontWeight: 'bold' }}> {showDate(lowDate)}</Text> with the price of {lowest}€.{"\n"}And the best day to sell was 
                     <Text style={{ fontWeight: 'bold' }}> {showDate(date)}</Text> with the price of {highest}€</Text>
            )
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {/*if the given dates are the same or if the 'from' date is after the 'to' date
                    we'll ask the user to give other dates.*/ }
                {unixFrom >= unixTo ? <Text style={styles.text} >Please pick other dates</Text> : 
                isLoading ? <ActivityIndicator /> : (
                    checkHighest()
                )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        //only for android
        elevation: 20,
    },
    text: {
        fontSize: 16,
    }

})
