import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';

export default function Bearish({ route, navigation }) {

    const { unixFrom, unixTo } = route.params;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    //get data first when the screen is loaded
    useEffect(() => { getData(); }, []);

    //Fething data from API
    const getData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${unixFrom}&to=${unixTo}`);
            const json = await response.json();
            //if the given dates are less than 90 days apart we get hourly data, so we'll filter out only the midnight-prices
            if (unixTo - unixFrom <= 7776000) {
                var array = json.prices.filter((i, index) => (index % 24 === 0))
                setData(array)
            } else {
                setData(json.prices)
            }
        } catch (error) {
            Alert.alert(error.message)
        } finally {
            setLoading(false);
        }
    };

    //Checking the longest bearish period
    const checkBearish = () => {
        let count = 0;
        let longest = 0;

        for (let i = 1; i < data.length; i++) {

            for (let j = 1; j < data[i].length; j++) {
                if (data[i][1] < data[i - 1][1]) {
                    count = count + 1;
                    if (count > longest) {
                        longest = count;
                    }
                } else {
                    count = 0;
                }
            };
        };
        return (
            <View>
                {longest != 1 ? <Text style={styles.text}>The longest bearish trend was: {longest} days</Text> :
                    <Text style={styles.text}>The longest bearish trend was: {longest} day</Text>
                }
            </View>
        );
    };

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View style={styles.textContainer}>
                {/*if the given dates are the same or if the 'from' date is after the 'to' date
                        we'll ask the user to give other dates.*/ }
                {unixFrom >= unixTo ? <Text style={styles.text}>Please pick other dates</Text> :
                    isLoading ? <ActivityIndicator /> : (
                        checkBearish()
                    )
                }
            </View>
        </View>
    )
}

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
        fontWeight: '100',
    }

})
