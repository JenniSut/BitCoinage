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

                var newArr = [];
                var i, j, temporary, chunk = 24;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    temporary = arr.slice(i, i + chunk);
                    var sum = 0;
                    //console.log(temporary)
                    for (let x = 0; x < temporary.length; x++) {
                        //console.log(temporary[x][1]);
                        sum = sum + temporary[x][1];
                    }//console.log(sum)
                    //console.log(temporary[0][0])
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

    const renderItem = ({ item }) => (
        <Text>{item}</Text>
    );

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
        return(
            <Text>Highest selling volume was {showDate(date)} with the volume of {highest}€</Text>
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