import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Speech from 'expo-speech';
import { css } from './assets/css/Css';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('');
  const [readingText, setReadingText] = useState(false);
  const [scanningEnabled, setScanningEnabled] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const buscarDescri = async (data) => {
    try {
      const res = await fetch('http://192.168.53.109:3000/descricao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idQRCode: data }),
      });

      if (res.ok) {
        const dados = await res.json();
        if (dados.error) {
          setReadingText(true);
          Speech.speak('QR Code inválido.', {
            onDone: () => {
              setReadingText(false);
              setScanned(false);
            },
          });
        } else if(dados) {
          setText(dados);
          setReadingText(true);
          Speech.speak(dados[0].descricao, {
            onDone: () => {
              setReadingText(false);
              setScanned(false);
            },
          });
        } 
      } else if (res.status) {
        // Handle 404 Not Found
        setReadingText(true);
        Speech.speak('QR Code inválido.', {
          onDone: () => {
            setReadingText(false);
            setScanned(false);
          },
        });
      } else {
        console.error(`Error: ${res.status} - ${res.statusText}`);
      }
    } catch (erro) {
      console.error(erro);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanningEnabled) {
      return;
    }
    setScanningEnabled(false); // Disable scanning until speech ends
    console.log(data);
    buscarDescri(data);
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
        onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && !readingText && (
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(true);
              setScanningEnabled(true);
            }}
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
