import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaTeste from './src/telas/TelaTeste';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('TelaTeste', { type, data });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Acesso à câmera não permitido.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Toque para escanear novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TelaTeste" component={TelaTeste} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
