import React, { useState, useEffect } from 'react'
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
                var array = json.prices.filter((i, index) => (index % 24 === 0))
                setData(array)
            }else {
                setData(json.prices)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    //Changing the unix dates to a more redable form
    const changeDate = (unixdate) => {
        var readableDate = new Date(unixdate * 1000)
        readableDate = readableDate.getDate() + '.' + (readableDate.getMonth() + 1) + '.' + readableDate.getFullYear()
        return (readableDate);
    };

    //Changing unix dates that are already in milliseconds to a more reabadle form
    const showDate = (unixdate) => {
        var readableDate = new Date(unixdate)
        readableDate = readableDate.getDate() + '.' + (readableDate.getMonth() + 1) + '.' + readableDate.getFullYear()
        return (readableDate);
    };

    //Checking the highest and lowest prices and dates for comparing
    const checkHighest = () => {

            //initializing the lowest and highest + dates


            let highest = 0;
            let lowest = 1000000000;
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
                        console.log('lowdate ' + lowDate + changeDate(lowDate))
                    }
                }


            }
            console.log(data)
            return (
                (lowDate > date) ?
                    <Text>You shouldn't buy bitcoin between {changeDate(unixFrom)} and {changeDate(unixTo)}!</Text>
                    : <Text>The best day to buy Bitcoin between {changeDate(unixFrom)} and {changeDate(unixTo)} was {showDate(lowDate)} with the price of {lowest}€ and the best day to sell was {showDate(date)} with the price of {highest}€</Text>
            )
        
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {unixFrom >= unixTo ? <Text>Please pick other dates</Text> : 
            isLoading ? <ActivityIndicator /> : (
                checkHighest()
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({})
