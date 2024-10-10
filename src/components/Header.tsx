import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from 'assets/images/sm-logo.svg';
import BackIcon from 'assets/images/back.svg';
import InfoIcon from 'assets/images/info.svg';
import HeartIcon from 'assets/images/heart.svg';

interface IProps {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isGame?: boolean;
  handleRightBtn?: () => void;
  handleLeftBtn?: () => void;
  levelsAmount?: number;
  currentLevel?: number;
}

export const Header = ({
  rightIcon,
  leftIcon,
  isGame,
  handleRightBtn,
  handleLeftBtn,
  levelsAmount,
  currentLevel,
}: IProps) => {

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 1]}
      angle={100}
      colors={['#43BCF0', '#571280']}
      style={[
        styles.header,
        { 
          height: insets.top + 68,
        }]
      }
    >
      <View style={styles.container}>
      {handleLeftBtn && (
        <Pressable onPress={handleLeftBtn} style={styles.leftBtn}>
          {leftIcon || <BackIcon/>}
        </Pressable>
      )}
        {isGame ? <HeartIcon/> : <Logo/>}
      {handleRightBtn && (
        <Pressable onPress={handleRightBtn} style={styles.rightBtn}>
          {rightIcon || <InfoIcon/>}
        </Pressable>
      )}
      {levelsAmount && currentLevel && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 1]}
          angle={100}
          colors={['#00FFB2', '#24BFC9']}
          style={styles.levelWrapper}
        >
          <Text style={{ fontSize: 18 }}>
            {currentLevel}/{levelsAmount}
          </Text>
        </LinearGradient>
      )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  container: {
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBtn: {
    position: 'absolute',
    left: 25,
  },
  rightBtn: {
    position: 'absolute',
    right: 25,
  },
  levelWrapper: {
    borderRadius: 50,
    height: 26,
    paddingHorizontal: 12, 
    position: 'absolute',
    right: 25,
  }
})