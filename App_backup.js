import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { css } from './assets/css/Css';

const audioMapping = {
  'https://get-qr.com/_w4cra': require('./assets/audios/B-11.mp3'), //B-11
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'), //B-15
  'https://get-qr.com/fymwh5': require('./assets/audios/2-andar-B.mp3'), //Segundo Andar B
  'https://get-qr.com/wJd1Rg': require('./assets/audios/Hall.mp3'), //Hall de Entrada
  'https://get-qr.com/v8vt-7': require('./assets/audios/2-andar-A.mp3'), //Segundo Andar A
  'https://get-qr.com/CGJxMp': require('./assets/audios/Lab-bio.mp3'), // Laboratório Biologia
  'https://get-qr.com/Pf1Kzc': require('./assets/audios/Lab-micro.mp3'), //Laboratório Microbiologia
  'https://get-qr.com/s4Mbx1': require('./assets/audios/Predio-B.mp3'), //Prédio B
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),
  'https://get-qr.com/irKHUi': require('./assets/audios/B-15.mp3'),

  //'data3': require('./assets/audios/audio3.mp3'),
  // Add more mappings as needed
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      alert(`Pronto para escanear! confirme o aviso para continuar!`);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    if (audioMapping[data]) {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(audioMapping[data]);
        await soundObject.playAsync();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('No audio mapping found for the scanned QR code data.');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={css.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <SafeAreaView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Aperte para escanear!</Text>
        </TouchableOpacity>
      </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 80,
    backgroundColor: '#4b8eff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});
