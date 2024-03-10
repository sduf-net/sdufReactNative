import * as React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TinderCard } from 'rn-tinder-card';
import { onSwipedRight, onSwipedLeft, onSwipedTop } from '../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function TinderWidget({ data }) {
  const navigation = useNavigation();
  const route = useRoute();

  const OverlayRight = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Like</Text>
      </View>
    );
  };
  const OverlayLeft = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Nope</Text>
      </View>
    );
  };
  const OverlayTop = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Super Like</Text>
      </View>
    );
  };

  console.log(data.cards)

  return (
    <View style={styles.wrapper}>
      {data.cards.map((item, index) => {
        console.log('item', item)
        return (
          <View
            style={styles.cardContainer}
            pointerEvents="box-none"
            key={index}
          >
            <TinderCard
              cardWidth={380}
              cardHeight={730}
              OverlayLabelRight={OverlayRight}
              OverlayLabelLeft={OverlayLeft}
              OverlayLabelTop={OverlayTop}
              cardStyle={styles.card}
              onSwipedRight={() => {
                onSwipedRight(data.actions, navigation, route);
              }}
              onSwipedTop={() => {
                onSwipedTop(data.actions, navigation, route);
              }}
              onSwipedLeft={() => {
                onSwipedLeft(data.actions, navigation, route);
              }}
            >
              <Image source={{ uri: item.src }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </TinderCard>
          </View>
        );
      })}
    </View>
  );
}
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 48,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
  },
  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabelText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  title: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
    width: '80%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  }
});