import React from 'react';
import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';
import Logo from 'assets/images/logo.svg';
import { CustomButton } from 'components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ScreenEnum } from 'utils/types';
import appsFlyer from 'react-native-appsflyer';

export const StartScreen = () => {

  const { navigate } = useNavigation();

  const hanndleStart = async () => {
    navigate(ScreenEnum.Levels);
    appsFlyer.logEvent('start', {}, (result) => {
      console.log('Event tracked successfully:', result);
    }, (error) => {
      console.error('Event tracking failed:', error);
    });
  };

  return (
    <LinearGradient
      start={{ x: 1, y: -0.2 }}
      locations={[0, 0.59, 1]}
      angle={135}
      colors={['#43BCF0', '#541896', '#711280']}
      style={styles.container}
    >
      <View style={styles.logoWrapper}>
        <Logo/>
      </View>
      <View style={styles.footer}>
        <CustomButton
          onPress={hanndleStart}
          text="Start"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingBottom: 90,
    alignItems: 'center',
  }
});