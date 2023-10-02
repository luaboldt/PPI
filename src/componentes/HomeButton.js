import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Voltar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});
