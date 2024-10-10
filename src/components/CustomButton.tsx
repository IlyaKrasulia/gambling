import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

interface IProps {
  text: string;
  onPress: () => void;
}

export const CustomButton = ({ text, onPress }: IProps) => {
  return (
    <LinearGradient
      start={{ x: 1, y: -0.2 }}
      locations={[0, 0.59, 1]}
      angle={135}
      colors={['#43BCF0', '#541896', '#711280']}
      style={styles.buttonWrapper}
    >
      <Pressable
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.btnText}>
          start
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 50,
  },
  button: {
    minWidth: 140,
    minHeight: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6EBCF7',
    borderRadius: 50,
    margin: 2,
  },
  btnText: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'uppercase',
  }
});