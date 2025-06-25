import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏝️ Welcome to Tobago</Text>
      <Text style={styles.subtitle}>Explore the beautiful island!</Text>
      <Text style={styles.description}>
        Discover pristine beaches, hidden waterfalls, and vibrant culture.{"\n"}
        Your Caribbean adventure starts here.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2E8B57',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4682B4',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
}); 