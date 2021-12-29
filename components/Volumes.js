import React, { useState, useEffect } from 'react'
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList } from 'react-native'

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
            if (unixTo - unixFrom <= 7776000) {
                var arr = json.total_volumes;
                //if requested dates are less than 90 days apart we get hourly data,
                //so we have to count the hourly volumes together so we get 24h data
                //and get the days first timestamp as the date
                var newArr = [];
                var i, j, temporary, chunk = 24;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    temporary = arr.slice(i, i + chunk);
                    var sum = 0;
                    for (let x = 0; x < temporary.length; x++) {
                        sum = sum + temporary[x][1];
                    }
                    newArr.push([temporary[0][0], sum])

                };
                setData(newArr)
            } else {
                setData(json.total_volumes);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);

        }
    };

    //Changing unix dates that are already in milliseconds to a more reabadle form
    const showDate = (unixdate) => {
        var readableDate = new Date(unixdate)
        readableDate = readableDate.getDate() + '.' + (readableDate.getMonth() + 1) + '.' + readableDate.getFullYear()
        return (readableDate);
    };

    //checking the highest volume in given array and its timestamp
    const checkHighest = () => {
        let highest = 0;
        let date = 0;

        for (let i = 0; i < data.length; i++) {

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][1] >= highest) {
                    highest = data[i][1];
                    date = data[i][0];
                }
            }
        }
        return (
            <Text style={styles.text}>The highest selling volume was on the <Text style={{ fontWeight: 'bold' }}>{showDate(date)}</Text> with the volume of {highest}€</Text>
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {/*if the given dates are the same or if the 'from' date is after the 'to' date
                    we'll ask the user to give other dates.*/ }
                {unixFrom >= unixTo ? <Text style={styles.text}>Please pick other dates</Text> :
                    isLoading ? <ActivityIndicator /> : (
                        checkHighest()
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