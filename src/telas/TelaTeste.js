import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const TelaTeste = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon</Text>
      <View style={styles.pokemonContainer}>
        <Image
          style={styles.pokemonImage}
          source={require('../../assets/pokemon1.png')}
        />
        <Image
          style={styles.pokemonImage}
          source={require('../../assets/pokemon2.png')}
        />
        <Image
          style={styles.pokemonImage}
          source={require('../../assets/pokemon3.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pokemonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
});

export default TelaTeste;
