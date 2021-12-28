import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Bearish({ route, navigation }) {

    const { unixFrom, unixTo } = route.params;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => { getData(); }, []);



    const getData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${unixFrom}&to=${unixTo}`);
            const json = await response.json();
            if (unixTo - unixFrom <= 7776000) {
                var array = json.prices.filter((i, index) => (index % 24 === 0))
                setData(array)
                console.log(data)
            }else {
                setData(json.prices)
            }
            //setData(json.prices);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkBearish = () => {
        
        let count = 0;
        let longest = 0;
        
        for (let i = 1; i < data.length; i++) {
            
            for (let j = 1; j < data[i].length; j++) {
                if (data[i][1] < data[i - 1][1]) {
                    console.log('bearish')
                    count = count + 1 ;
                    if ( count > longest) {
                        longest = count;
                    }
                } else {
                    count = 0;
                    console.log('bullish')
                }
            }
        }return (
            <Text>The longest bearish was: {longest}</Text>
        )

    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            {unixFrom >= unixTo ? <Text>Please pick other dates</Text> :
                isLoading ? <ActivityIndicator /> : (
                    checkBearish()
                )}
        </View>
    )
}

const styles = StyleSheet.create({


})
