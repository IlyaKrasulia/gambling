import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cards from 'assets/images/cards.svg';
import { screenWidth } from 'utils/styles';
import { LEVELS } from 'utils/data';
import { ScreenEnum, StackParamList } from 'utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from 'components/Header';
import { useNavigation } from '@react-navigation/native';
import { GameOverModal } from 'components/GameOverModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<StackParamList, ScreenEnum.Game>;

export const GameScreen = ({ route }: Props) => {

  const { goBack } = useNavigation();
  const { level } = route.params;
  const [cards, setCards] = useState<Array<any>>([]);
  const [flippedCards, setFlippedCards] = useState<Array<number>>([]);
  const [isChecking, setIsChecking] = useState(false);
  const animatedValues = useRef<Array<Animated.Value>>([]).current;
  const [shwoGameOverModal, setShwoGameOverModal] = useState(false);
  const [isWin, setWin] = useState(false);
  const { navigate } = useNavigation();

  const initializeGame = () => {
    const cardValues = level.cards;
    const newCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, isFlipped: true, isMatched: false }));

    animatedValues.splice(0, animatedValues.length, ...newCards.map(() => new Animated.Value(180)));
    setCards(newCards);
    setFlippedCards([]);
    setIsChecking(false);
    setWin(false);
    setShwoGameOverModal(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const flipCard = (index: number) => {
    const currentValue = animatedValues[index];
    Animated.timing(currentValue, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const flipCardBack = (index: number) => {
    const currentValue = animatedValues[index];
    Animated.timing(currentValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isMatched || cards[index].isFlipped || flippedCards.length === 2) return;
  
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
  
    flipCard(index);
  
    setFlippedCards([...flippedCards, index]);
  
    if (flippedCards.length === 1) {
      setIsChecking(true);
      setTimeout(() => {
        checkMatch(newCards, index);
      }, 1000);
    }
  };
  

  const checkMatch = (newCards: Array<any>, index: number) => {
    const [firstIndex] = flippedCards;
    const secondIndex = index;
  
    if (newCards[firstIndex].value === newCards[secondIndex].value) {
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      checkIfGameCompleted(newCards);
    } else {
      flipCardBack(firstIndex);
      flipCardBack(secondIndex);
      newCards[firstIndex].isFlipped = false;
      newCards[secondIndex].isFlipped = false;
    }
  
    setCards(newCards);
    setFlippedCards([]);
    setIsChecking(false);
  };

  const checkIfGameCompleted = (newCards: Array<any>) => {
    const allMatched = newCards.every(card => card.isMatched);
    if (allMatched) {
      setWin(true);
      addFinishedLevel();
      setShwoGameOverModal(true);
    }
  };

  const addFinishedLevel = async () => {
    try {
      const finishedLevels = await AsyncStorage.getItem('finishedLevels');
      const list = finishedLevels ? [...JSON.parse(finishedLevels)] : [];
      const levelIndex = list.findIndex((it: number) => it === level.id);
      if (levelIndex !== -1) {
        list.push(level.id);
      }
      await AsyncStorage.setItem('finishedLevels', JSON.stringify(list));
    } catch (err) {
      console.log(err, ' => err addFinishedLevel')
    }
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const newCards = cards.map((card, index) => {
        if (!card.isMatched) {
          flipCardBack(index);
          return { ...card, isFlipped: false };
        }
        return card;
      });
      setCards(newCards);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [cards]);
  

  const size = useMemo(() => {
    return (screenWidth - 80 - 15 * (level.numColumns - 1)) / level.numColumns;
  }, []);

  const currentLevel = useMemo(() => {
    return LEVELS.findIndex(it => it.id === level.id) + 1;
  }, []);

  const nextLevel = () => {
    if (currentLevel === LEVELS.length) {
      navigate(ScreenEnum.Levels);
      return;
    }
    navigate(ScreenEnum.Game, { level: LEVELS[currentLevel - 1] });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWin(false);
      setShwoGameOverModal(true);
    }, 5000);
    if (shwoGameOverModal) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [shwoGameOverModal]);

  return (
    <ImageBackground
      style={styles.container}
      source={level.bg}
    >
      <Header
        handleLeftBtn={goBack}
        isGame
        levelsAmount={LEVELS.length}
        currentLevel={currentLevel}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.grid}>
        {cards.map((card, index) => {
          const frontInterpolate = animatedValues[index].interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          });
          const backInterpolate = animatedValues[index].interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          });

          return (
            <TouchableOpacity key={card.id} onPress={() => handleCardClick(index)}>
              <View
                style={[
                  styles.cardContainer,
                  { 
                    width: size,
                    height: size,
                  }
                ]}
              >
                <Animated.View
                  style={[
                    styles.card,
                    styles.front,
                    { transform: [{ rotateY: frontInterpolate }] },
                  ]}
                >
                  <LinearGradient
                    style={[
                        { 
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: size,
                          height: size,
                          borderRadius: 9,
                        }
                    ]}
                    start={{ x: 1, y: -0.2 }}
                    locations={[0, 0.59, 1]}
                    angle={135}
                    colors={['#43BCF0', '#541896', '#711280']}
                  >
                    <Cards/>
                  </LinearGradient>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.card,
                    styles.back,       
                    { 
                      transform: [{ rotateY: backInterpolate }],
                      width: size,
                      height: size,
                    },
                  ]}
                >
                  <Image
                    source={card.value}
                    style={{ height: 100, width: 100 }}
                    resizeMode="center"
                  />
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <GameOverModal
        visible={shwoGameOverModal}
        close={() => setShwoGameOverModal(false)}
        isWin={isWin}
        onPress={isWin ? nextLevel : initializeGame}
      />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    borderWidth: 2,
  },
  front: {
    borderRadius: 10,
  },
  back: {
    borderRadius: 10,
    backgroundColor: '#2E2B42',
    borderWidth: 4,
    borderColor: '#6EBCF7',
  },
  cardText: {
    fontSize: 32,
  },
});
