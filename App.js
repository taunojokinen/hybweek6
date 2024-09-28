import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';



export default function App() {
  
  const [time, setTime] = useState(12);
  const [date, setDate] = useState('2024-09-28');
  const [price, setPrice] = useState(22.58);

 useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hour = currentDate.getHours();
    setTime(hour);
    setDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    const URL =`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${time}`;
    console.log(URL);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        setPrice(json.price);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log('fetch done'));
  }, [date, time]);
  
  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <Text style={styles.heading}>Sähkön hinta</Text>
        <Text style={styles.field}>Päivä {date}</Text>
        <Text style={styles.field}>Aika {time}</Text>
        <Text style={styles.result}>Sähkön hinta nyt</Text>
        <Text style={styles.result}>{price.toFixed(2)}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    margin: 8,
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    marginTop: 120,
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
    textAlign: 'center',

  },
  result: {
    fontSize: 36,
    marginTop: 60,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: 0,
  },
});
