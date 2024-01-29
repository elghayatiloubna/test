import React from 'react';
import { View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'slide1',
    title: 'Bienvenue dans notre application de cartographie',
    text: 'Découvrez de nouveaux endroits passionnants et trouvez votre chemin facilement.',
    image: require('../assets/image11.jpeg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'slide2',
    title: 'Recherchez des lieux',
    text: 'Trouvez des restaurants, des magasins et bien plus encore à proximité de votre position.',
    image: require('../assets/image12.jpeg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'slide3',
    title: 'Navigation simple',
    text: 'Obtenez des itinéraires détaillés et faciles à suivre vers votre destination.',
    image: require('../assets/image13.jpeg'),
    backgroundColor: '#22bcb5',
  },
];

const IntroSlider = ({ navigation }) => {
  const renderSlide = ({ item }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={item.image} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>{item.title}</Text>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>{item.text}</Text>
    </View>
  );

  const handleDone = () => {
    // Une fois que l'utilisateur a terminé l'introduction, vous pouvez naviguer vers la page suivante.
    navigation.navigate('Welcome');
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      onDone={handleDone}
      nextLabel={<Text style={{ color: 'red' }}>Suivant</Text>} // Personnalisez la couleur du bouton "Next"
      doneLabel={<Text style={{ color: 'green' }}>Terminer</Text>} // Personnalisez la couleur du bouton "Done"
    />
  );
};

export default IntroSlider;