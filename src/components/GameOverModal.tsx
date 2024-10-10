import React, { } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { screenWidth } from 'utils/styles';
import LinearGradient from 'react-native-linear-gradient';
import HomeIcon from 'assets/images/home.svg';
import BackIcon from 'assets/images/back.svg';
import { ScreenEnum } from 'utils/types';

interface IProps {
  visible: boolean;
  isWin?: boolean;
  close: () => void;
  onPress: () => void;
}

export const GameOverModal = ({ visible, isWin, close, onPress }: IProps) => {

  const { navigate } = useNavigation();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={close}
      onBackButtonPress={close}
      swipeDirection="down"
      onSwipeComplete={close}
      animationIn="bounceInUp"
      animationInTiming={1200}
      animationOut="bounceOutDown"
      animationOutTiming={800}
      propagateSwipe={true}
      backdropOpacity={0.5}
      backdropColor='#353535'
      style={[styles.bottomModal]}
    >
      <>
      <LinearGradient
        start={{ x: 1, y: -0.2 }}
        locations={[0, 1]}
        angle={135}
        colors={['#8864E8', '#43BCF0']}
        style={styles.modal}
      >
        <LinearGradient
          start={{ x: 1, y: -0.2 }}
          locations={[0, 0.59, 1]}
          angle={135}
          colors={['#43BCF0', '#541896', '#711280']}
          style={styles.statusWrapper}
        >
          <Text style={styles.text}>
            {isWin ? 'You Won!' : 'You lost!'}
          </Text>
        </LinearGradient>
      </LinearGradient>
      <View style={styles.footer}>
        <Pressable
          onPress={() => {
            close();
            navigate(ScreenEnum.Levels);
          }}
        >
          <HomeIcon/>
        </Pressable>
        <Pressable
          onPress={onPress}
          style={{
            transform: [{ rotate: isWin ? '180deg' : '0deg' }]
          }}
        >
          <BackIcon width={40} height={40}/>
        </Pressable>
      </View>
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    flex: 1,
    alignItems: 'center',
  },
  modal: {
    width: screenWidth - 110,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 20,
    paddingVertical: 55,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
  statusWrapper: {
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    width: screenWidth - 110,
    paddingHorizontal: 60,
    justifyContent: 'space-between',
  }
});

