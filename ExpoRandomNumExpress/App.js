import { StatusBar, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [error, setError] = useState(null);

  const fetchRandomNumber = async () => {
    try {
      const response = await fetch('http://192.168.0.103:5000/random');
      if (!response.ok) {
        throw new Error('Network request failed');
      }
      const data = await response.json();
      setRandomNumber(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRandomNumber();
  }, []);

  const handleReload = () => {
    fetchRandomNumber();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleReload} />
      }
    >
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.containr}>{randomNumber}</Text>

      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  containr: {
    color: 'blue',
    fontSize: 160,
    marginBottom: 10,
  },
});
