import { Image, StyleSheet } from 'react-native';
import Lightbox from 'react-native-lightbox-v2';

export const LightboxView = ({ navigator }) => (
  <Lightbox navigator={navigator} style={[styles.image]}>
    <Image
      style={{ height: 500 }}
      source={{
        uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg',
      }}
    />
  </Lightbox>
);

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
});
