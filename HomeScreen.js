// HomeScreen.js
import React , { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Load and play audio
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/audio1.m4a')
      );
      await sound.playAsync(); 
    };

    playSound();

    return () => {
      // Unload the audio when the component unmounts
      sound.unloadAsync();
    };
  }, []);



  const handleImagePress = (imageSource,location) => {
    navigation.navigate('FST', { imageSource, location });
  };

  const handleImage2Press = () => {

    navigation.navigate('FSSM');
  };

  const handleAdminButtonPress = () => {
    navigation.navigate('Admin');
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleImagePress(require('./assets/fst.jpg'),  { latitude: 31.642649578353293, longitude: -8.018809120694991 })}>
        <View>
          <Image source={require('./assets/fst.jpg')} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImage2Press}>
        <View>
          <Image source={require('./assets/fssm.png')} style={styles.image} />
        </View>
      </TouchableOpacity>


      {/* Ajouter un bouton pour aller vers Admin.js */}
      <Button title="+" onPress={handleAdminButtonPress} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#508DA7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    margin: 30,
  },
});

export default HomeScreen;
