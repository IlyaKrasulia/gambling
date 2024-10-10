import { useNavigation } from '@react-navigation/native';
import { Header } from 'components/Header';
import React from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import appsFlyer from 'react-native-appsflyer';
import { LEVELS } from 'utils/data';
import { ScreenEnum } from 'utils/types';

export const LevelsScreen = () => {

  const { navigate } = useNavigation();

  const hanndleLevel = (item: any) => {
    navigate(ScreenEnum.Game, { level: item })
    appsFlyer.logEvent('start_game', { level: item.id }, (result) => {
      console.log('Event tracked successfully:', result);
    }, (error) => {
      console.error('Event tracking failed:', error);
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('assets/images/gradient.png')}
    >
      <Header
        handleRightBtn={() => navigate(ScreenEnum.Rules)}
      />
      <FlatList
        data={LEVELS}
        renderItem={({ item }) => (
          <Pressable onPress={() => hanndleLevel(item)}>
            <Image
              style={styles.item}
              source={item.img}
            />
          </Pressable>
        )}
        keyExtractor={(_, index) => `level_${index}`}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow:  1,
    alignItems: 'center',
    gap: 20,
    paddingVertical: 40,
  },
  columnWrapper: {
    gap: 20,
  },
  item: {
    width: 130,
    height: 130,
  },
});