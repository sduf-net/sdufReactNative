import React, { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TinderCard } from 'rn-tinder-card';
import { onSwipedRight, onSwipedLeft, onSwipedTop, onSwipedBottom, handleEventAction } from '../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TinderWidget({ data }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [cards, setCards] = useState(data.cards ?? []);
  const [loadingMoreCards, setLoadingMoreCards] = useState(false);

  const onSwipe = async (index) => {
    let editableCards = [...cards];
    editableCards.splice(index, 1)
    setCards([...editableCards]);

    if (index !== 0) return;

    try {
      setLoadingMoreCards(true);

      const newCards = await handleEventAction(
        data.actions.load_more,
        navigation,
        route
      );
      setCards([...newCards]);

    } catch (error) {
      console.error("Error fetching new cards:", error);
    } finally {
      setLoadingMoreCards(false);
    }
  };

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
  const OverlayBottom = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Super DisLike</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {!loadingMoreCards ? cards.map((item, index) => {
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
              OverlayLabelBottom={OverlayBottom}
              cardStyle={styles.card}
              onSwipedRight={async () => {
                onSwipe(index);
                onSwipedRight(data.actions, navigation, route);
              }}
              onSwipedTop={() => {
                onSwipe(index);
                onSwipedTop(data.actions, navigation, route);
              }}
              onSwipedLeft={() => {
                onSwipe(index);
                onSwipedLeft(data.actions, navigation, route);
              }}
              onSwipedBottom={() => {
                onSwipe(index);
                onSwipedBottom(data.actions, navigation, route);
              }}
            >
              <Image source={{ uri: item.src }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </TinderCard>
          </View>
        );
      }) : <Text>Loading...</Text>}
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